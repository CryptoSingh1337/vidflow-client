export type Login = {
    responseStatus: string,
    data: {
      accessToken: string,
      refreshToken: string
    },
    error: any
  }

export type Register = Login

export type User = {
    user: {
      id: string,
      username: string,
      channelName: string,
      firstName: string,
      lastName: string,
      email: string,
      profileImage: string
    }
  }

export type Jwt = {
  sub: string,
  iss: string,
  exp: string
}
