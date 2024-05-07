const httpStatus = require("http-status");

const Error = {
  // 100++ Error from info of the client
  UrlNotFound: {
    errCode: 100,
    errMessage: "Request URL not found",
  },

  UserNameInvalid: {
    errCode: 101,
    errMessage: "Username is invalid",
  },
  PasswordInvalid: {
    errCode: 102,
    errMessage: "Password is invalid",
  },
  UserNotFound: {
    errCode: 103,
    errMessage: "User not found",
  },

  QrInvalid: {
    errCode: 104,
    errMessage: "qrCode not valid",
  },

  EmailInvalid: {
    errCode: 105,
    errMessage: "Email not valid",
  },

  EmailEmpty: {
    errCode: 106,
    errMessage: "Email is empty",
  },

  EmailDuplicate: {
    errCode: 107,
    errMessage: "Email duplicated",
  },

  UserIdInvalid: {
    errCode: 108,
    errMessage: "User id invalid",
  },

  AuthHeaderMissing: {
    errCode: 109,
    errMessage: "Auth header missing",
  },

  PasswordEmpty: {
    errCode: 110,
    errMessage: "Password is empty",
  },
  UserAlreadyExists: {
    errCode: 111,
    errMessage: "User already existed",
  },
  SessionExpired: {
    errCode: 112,
    errMessage: "Session expired",
  },
  EmptyPlaylist: {
    errCode: 113,
    errMessage: "Playlist is empty",
  },
  EmptySongId: {
    errCode: 114,
    errMessage: "SongId is empty",
  },
  EmptyTimerSettings: {
    errCode: 115,
    errMessage: "TimerSettings is empty",
  },
  EmptySong: {
    errCode: 116,
    errMessage: "Song is empty",
  },
  DeletedSongNotExists: {
    errCode: 117,
    errMessage: "Deleted song not existed to delete",
  },
  TimerSettingsNotFound: {
    errCode: 118,
    errMessage: "Timer Settings not found",
  },
  EmptyTask: {
    errCode: 119,
    errMessage: "Task is empty",
  },
  EmptyTaskIndex: {
    errCode: 120,
    errMessage: "Task index empty",
  },
  DeletedTaskNotExists: {
    errCode: 121,
    errMessage: "Deleted tasks not existed to delete",
  },
  NewPasswordInvalid: {
    errCode: 122,
    errMessage: "New password is the same as the current password",
  },

  // 200++ Error from Db
  CastError: {
    errCode: 201,
    errMessage: "Cast field error",
  },
  DuplicateFieldError: {
    errCode: 202,
    errMessage: "Duplicate field error",
  },

  // 300++ Error from Third Party
  JwtInvalid: {
    errCode: 300,
  },
  JwtMissing: {
    errCode: 301,
    errMessage: "Jwt is missing",
  },

  // 400++ Error from Internal Server
  GenericError: {
    errCode: 400,
    errMessage: "Something wrong happened.",
  },
  RedisNotCached: {
    errCode: 401,
    errMessage: "Redis can not cache new data",
  },
};
module.exports = Error;