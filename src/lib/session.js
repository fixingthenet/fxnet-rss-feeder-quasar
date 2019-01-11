import moment from 'moment'
import jwt from 'jsonwebtoken'

class Session {
  constructor(token) {
    this.token=token
    if (token) {
      this.decoded=jwt.decode(this.token)
    } else {
      console.log("no token")
    }
  }
  expiresAt() {
    if (this.token) {
      return new Date(this.decoded.exp*1000)
    } else {
      return (new Date() - 1000)
    }
  }

  timeLeft() {
    return (this.expiresAt() - new Date())/1000
  }

  isExpired() {
    return this.timeLeft() < 0
  }
  
  user() {
    return this.decoded.user
  }
  
  toString() {
    return moment(this.expiresAt()).fromNow()
  }
}
export default Session;
