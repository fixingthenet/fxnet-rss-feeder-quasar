import {LocalStorage} from 'quasar'
import Session from '../../lib/session'

export default {
  session: new Session(LocalStorage.get.item('login_token'))
}
