import React,{PropTypes} from 'react';
import { Link } from 'dva/router';
import styles from './PerformExperienceList.less';

const ReleaseList = ({
    year,type,filmName,
    name,level,director,
    cooperationPerformer,description,onDelect,onEdit,
    id,movieName
}) => {
  return (
    <div className={styles.undergoBox}>
        <p><span>{year}年</span><span>{type}</span>《{movieName}》
            <Link to = {`me/addExperience/${id}`} className={styles.edit}>
                编辑
            </Link>
        </p>
        <p><span>{name}</span>{level}<span className={styles.edit} onClick = {onDelect.bind(this,id) }>删除</span></p>
        <p>合作导演：{director}</p>
        <p>合作艺人：{cooperationPerformer}</p>
        <p>其他：{description}</p>
    </div>
  );
};

ReleaseList.propTypes = {
    year:PropTypes.string,
    type:PropTypes.string,
    movieName:PropTypes.string,
    name:PropTypes.string,
    level:PropTypes.string,
    director:PropTypes.string,
    cooperationPerformer:PropTypes.string,
    description:PropTypes.string,
    onDelect:PropTypes.func,
    onEdit:PropTypes.object,
    id:PropTypes.number,
};

export default ReleaseList;
