export const schema = gql`
  directive @skipAuth on FIELD_DEFINITION
`

export const skipAuth = () => {
  return
}
