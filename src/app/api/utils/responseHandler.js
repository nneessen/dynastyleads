import { NextResponse } from 'next/server';

export function handleSuccess(data, statusCode = 200) {
  return NextResponse.json({ success: true, data }, { status: statusCode });
}

export function handleError(error, statusCode = 500, code = 'INTERNAL_ERROR') {
  // Possibly parse error, then
  return NextResponse.json(
    { success: false, error: { message: error.message, code } },
    { status: statusCode }
  );
}
