import supabase from '../supabase/client';

export const signupUser = async (userData) => {
  const {
    email,
    password,
    full_name,
    national_producer_number,
    phone_number,
    agency,
    date_of_birth,
    calendar_link,
    website_link,
    facebook_link,
    instagram_link,
    linkedin_link,
    role
  } = userData;

  try {
    console.log('Starting Supabase Auth user creation...');
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirmed: true,
        user_metadata: { full_name }
      });

    if (authError) {
      console.error('Auth creation error:', authError);
      throw new Error(`Auth creation failed: ${authError.message}`);
    }

    const userId = authData.user.id; // UUID from Supabase Auth

    console.log('Inserting into users table...');
    const { data, error } = await supabase.from('users').insert({
      id: userId,
      email,
      full_name,
      national_producer_number,
      phone_number,
      agency,
      date_of_birth,
      calendar_link,
      website_link,
      facebook_link,
      instagram_link,
      linkedin_link,
      role
    });

    if (error) {
      console.error('Users table insertion error:', error);
      throw new Error(`Users table insertion failed: ${error.message}`);
    }

    console.log('User successfully created!');
    return authData.user; // Return the created user object
  } catch (err) {
    console.error('Signup process error:', err);
    throw new Error(`Failed to create user: ${err.message}`);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error || !data.session) {
      console.log('Login error:', error);
      throw new Error(
        error?.message || 'Login failed. Please check your credentials.'
      );
    }

    console.log('User login successful!');
    return {
      user: data.user,
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token // optional for token refresh
    };
  } catch (err) {
    console.error('Login process error:', err);
    throw new Error(`Login error: ${err.message}`);
  }
};

export const getUserById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(`User fetch failed: ${error.message}`);

    return data;
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    throw new Error(`Failed to fetch user: ${err.message}`);
  }
};

export const updateUser = async (id, updates) => {
  try {
    const { full_name, password, ...userTableUpdates } = updates;

    if (full_name || password) {
      const authUpdates = {};
      if (full_name) authUpdates.data = { full_name };
      if (password) authUpdates.password = password;

      const { error: authError } = await supabase.auth.admin.updateUserById(
        id,
        authUpdates
      );
      if (authError)
        throw new Error(`Auth update failed: ${authError.message}`);
    }

    const { data, error } = await supabase
      .from('users')
      .update(userTableUpdates)
      .eq('id', id);

    if (error) throw new Error(`User update failed: ${error.message}`);

    console.log('User successfully updated!');
    return data;
  } catch (err) {
    console.error('Error updating user:', err);
    throw new Error(`Failed to update user: ${err.message}`);
  }
};

export const deleteUser = async (id) => {
  try {
    const { error: authError } = await supabase.auth.admin.updateUserById(id, {
      email_confirmed_at: null
    });

    if (authError)
      throw new Error(`Auth deactivation failed: ${authError.message}`);

    const { data, error } = await supabase.from('users').delete().eq('id', id);

    if (error) throw new Error(`User deletion failed: ${error.message}`);

    console.log('User successfully deleted!');
    return data;
  } catch (err) {
    console.error('Error deleting user:', err);
    throw new Error(`Failed to delete user: ${err.message}`);
  }
};
