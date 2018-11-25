# jinzhu

## backend

###ranklist
the parameter of `event` contains `type`. When `type` equals 1, the cloud function returns cv of user（用户简历）.
When `type` equals 2, the cloud function returns the demand of user（发布需求）.

## frontend

1. `rankDemand`: 主页
1. `rankTeacher`: 家教排行
1. `main`: 家教信息
1. `my`: 个人主页
1. `detailResume`: 家教详情（由 `main`通过`Get`方法跳转传参`id=`）