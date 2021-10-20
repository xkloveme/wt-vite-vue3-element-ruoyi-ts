/*
 * @Description:
 * @Author: xkloveme
 * @Date: 2020-12-29 09:12:24
 * @LastEditors: xkloveme
 * @LastEditTime: 2021-10-20 13:42:43
 */
// {
//     "code": 0,
//     "msg": "success",
//     "data": {
//         "accessToken": "admin-token"
//     }
// }

export interface LoginModel {
  token: string
  code: number | string
  msg: string
}
