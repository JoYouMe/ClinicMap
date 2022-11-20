import React from 'react';
import styles from '../styles/MyClinicList.module.css';

const MyClinicList = (props) => {
  return (
    <div className={styles.myClinicTop}>
      {props.myClinicList.map((clinicItem, index) => (
        <div key={index} className={styles.myClinicCard}>
          <p>{clinicItem.yadmNm}</p>
          <p>{clinicItem.addr}</p>
          <p>{clinicItem.telno}</p>
          <button type="button" onClick={() => props.deleteClinic(clinicItem)}>
            삭제
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyClinicList;
