// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  users: [
    {
      id: 42,
      email: 'coolboyhy1607@gmail.com',
      user_metadata: { full_name: 'Nguyen Van Quyen' },
      app_metadata: { roles: 'admin' },
    },
    {
      id: 43,
      email: 'nguyenquyen@gmail.com',
      user_metadata: { full_name: 'Cong Quyen' },
      app_metadata: { roles: 'admin' },
    },
  ],
})
