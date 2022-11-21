import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '../styles/MyClinicList.module.css';

const MyClinicList = (props) => {
  const [ref, inView] = useInView();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      props.getClinicList(page + 1);
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  return (
    <div className={styles.myClinicTop}>
      {props.myClinicList.map((clinicItem, index) =>
        index === props.myClinicList.length - 1 ? (
          <div key={index} className={styles.myClinicCard} ref={ref}>
            <p>{clinicItem.yadmNm}</p>
            <p>{clinicItem.addr}</p>
            <p>{clinicItem.telno}</p>
            <button
              type="button"
              onClick={() => props.deleteClinic(clinicItem)}
            >
              삭제
            </button>
          </div>
        ) : (
          <div key={index} className={styles.myClinicCard}>
            <p>{clinicItem.yadmNm}</p>
            <p>{clinicItem.addr}</p>
            <p>{clinicItem.telno}</p>
            <button
              type="button"
              onClick={() => props.deleteClinic(clinicItem)}
            >
              삭제
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default MyClinicList;
