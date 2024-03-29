export type ErrorResponse = {
  error: any
}

export type UploadVideoResponse = {
  videoId: string,
  videoUrl: string,
  thumbnailUrl: string
}

export type LoginResponse = {
    responseStatus: string,
    data: {
      accessToken: string,
      refreshToken: string
    },
    error: any
  }

export type RefreshTokenResponse = LoginResponse

export type UserResponse = {
  data: {
    user: User
  }
}

export type User = {
  id: string,
  username: string,
  channelName: string,
  firstName: string,
  lastName: string,
  email: string,
  profileImage: string
}

export type AuthenticatedUser = User & {
  accessToken: string,
  accessTokenExpires: number,
  refreshToken: string
}

export type Jwt = {
  sub: string,
  iss: string,
  exp: string
}

export type Video = {
  id: string,
  title: string,
  userId: string,
  username?: string,
  channelName: string,
  description?: string,
  videoUrl?: string,
  views: number,
  likes?: number,
  dislikes?: number,
  createdAt: string,
  thumbnail: string
  videoStatus?: string,
  tags?: string[],
  comments?: Comment[]
}

export type Comment = {
  id: string,
  username: string,
  channelName: string,
  body: string,
  createdAt: string
}
