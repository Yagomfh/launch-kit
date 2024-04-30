const ROOT_PATH = '/'
const LOGIN_PATH = '/login'
const REGISTER_PATH = '/register'
const SETTINGS_PATH = '/settings'
const RETURN_PATH = '/return'
const CHECKOUT_PATH = '/checkout'

const paths = {
  RETURN_PATH,
  CHECKOUT_PATH,
  ROOT_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  SETTINGS_PATH
} as const

export default paths
