import axios from 'axios';
import React, { useCallback } from 'react';
import { API_BASE_URL } from '../../app-config';
import styles from '../styles/MyClinicList.module.css';

const MyClinicList = (clinicItem) => {
  // 저장된 병원 정보 반환
  axios.get(API_BASE_URL + '/getMyClinicList');

  // 저장한 병원 정보 삭제
  const deleteClinic = useCallback(() => {
    axios({
      method: 'delete',
      url: API_BASE_URL + '/delete',
      data: clinicItem,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('ACCESS_TOKEN'),
      },
    }).then((response) => {
      alert('삭제되었습니다');
    });
  }, [clinicItem]);

  return (
    <div className={styles.myClinicTop}>
      {Object.keys(clinicItem).length !== 0 ? (
        <div className={styles.myClinicCard}>
          <p>{clinicItem.yadmNm}</p>
          <p>{clinicItem.addr}</p>
          <p>{clinicItem.telno}</p>
          <button type="button" onClick={deleteClinic}>
            삭제
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MyClinicList;
