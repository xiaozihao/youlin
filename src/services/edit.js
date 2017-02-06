import request from '../utils/request';
import { httpUrl } from '../tests/testHttpUrl';

let URL = httpUrl();

export function fetchUserInfo(params) {//

  return request(`${URL}/user/performer/set_base.do`,{
    method: 'post',
    credentials:'include',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`nickName=${params.nickName}
          &cover=${params.cover}
          &sex=${params.sex}
          &birthDate=${params.birthDate}
          &weight=${params.weight}
          &height=${params.height}
          &constellation=${params.constellation}
          &ageGroup=${params.ageGroup}
          &residentCity=${params.residentCity}
          &mobile=${params.mobile}
          &isShowMobile=${params.isShowMobile}
          &school=${params.school}
          &professional=${params.professional}
          &tags=${params.tags}
          &specialtys=${params.specialtys}
          &description=${params.description}`,
    mode:"cors",
  });
}

export function fetchUpdateCover(params) {//封面
  return request(`${URL}/user/set_cover.do`,{
    method: 'post',
    credentials:'include',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`cover=${params.cover}`,
    mode:"cors",
  });
}

export function fetchUpdateHeaderImage(params) {//用户头像
  return request(`${URL}/user/set_headimg.do`,{
    method: 'post',
    credentials:'include',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`headImg=${params.headImg}`,
    mode:"cors",
  });
}


export function fetchUpdatePhoto(params) {//用户头像
  return request(`${URL}/user/performer/set_albums.do`,{
    method: 'post',
    credentials:'include',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`albums=${params.albums}`,
    mode:"cors",
  });
}

export function fetchUpdateVideo(params) {//设置演员的两个视频
  return request(`${URL}/user/performer/set_movies.do`,{
    method: 'post',
    credentials:'include',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`trailersUrl=${params.trailersUrl}&introduceMyselfMoveUrl=${params.introduceMyselfMoveUrl}`,
    mode:"cors",
  });
}

export function fetchActorExperience(params) {//演员经历
  return request(`${URL}/user/performer/find_exp.do`,{
    method: 'post',
    credentials:'include',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`queryContent=${JSON.stringify(params)}`,
    mode:"cors",
  });
}

export function fetchQueryActorExperience(params) {//演员经历
  return request(`${URL}/user/performer/get_exp.do`,{
    method: 'post',
    credentials:'include',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`id=${params.id}`,
    mode:"cors",
  });
}

export function fetchDelectExperience(params) {//删除演员经历
  return request(`${URL}/user/performer/del_exp.do`,{
    method: 'post',
    credentials:'include',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`id=${params.id}`,
    mode:"cors",
  });
}

export function fetchAddExperience(params) {//添加演员经历
  let body;
  if (params.id === null) {
    body =  `type=${params.type}
              &year=${params.year}
              &level=${params.level}
              &description=${params.description}
              &movieName=${params.movieName}
              &cooperationDirector=${params.cooperationDirector}
              &cooperationPerformer=${params.cooperationPerformer}
              &roleName=${params.roleName}`;
  }else{
    body = `type=${params.type}
          &year=${params.year}
          &level=${params.level}
          &description=${params.description}
          &movieName=${params.movieName}
          &cooperationDirector=${params.cooperationDirector}
          &cooperationPerformer=${params.cooperationPerformer}
          &roleName=${params.roleName}
          &id=${params.id}`;
  }

  return request(`${URL}/user/performer/save_exp.do`,{
    method: 'post',
    credentials:'include',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:body,
    mode:"cors",
  });
}



