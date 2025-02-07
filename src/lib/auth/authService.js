import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

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
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirmed: true,
        user_metadata: { full_name }
      });

    if (authError) {
      throw new Error(`Auth creation failed: ${authError.message}`);
    }

    const userId = authData.user.id; // UUID from Supabase Auth

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
      throw new Error(`Users table insertion failed: ${error.message}`);
    }

    return authData.user; // Return the created user object
  } catch (err) {
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
      throw new Error(
        error?.message || 'Login failed. Please check your credentials.'
      );
    }

    return {
      user: data.user,
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      error
    };
  } catch (err) {
    throw new Error(`Login error: ${err.message}`);
  }
};

export async function logoutUser() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(`Logout failed: ${error.message}`);
    }

    return { success: true, message: 'Logged out successfully' };
  } catch (error) {
    throw new Error(`Logout error: ${error.message}`);
  }
}

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

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    // Instead of throwing an error, return null or handle logic here
    if (error.message.includes('Auth session missing')) {
      return null;
    }
    // If it’s a different error, you might still want to throw it
    throw new Error(`Failed to get current user: ${error.message}`);
  }

  // If there's no user in data, also return null
  if (!data || !data.user) {
    return null;
  }

  return data.user;
};
