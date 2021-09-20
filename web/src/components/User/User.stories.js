import User from './User'
const USER = {
  id: 1,
  email: 'coolboyhy1607@gmail.com',
  user_metadata: { full_name: 'Nguyen Van Quyen' },
  app_metadata: { roles: 'admin' },
}
export const generated = () => {
  return <User user={USER} />
}

export default { title: 'Components/User' }
