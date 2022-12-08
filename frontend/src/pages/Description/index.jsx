import React from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import SingleDescription from './components/singleDescription';
import { useState } from 'react';
import style from './index.module.css';

const Description = () => {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState([]);

  const data = [
    {
      name: '커피가게 아저씨 이용약관 동의',
      detail:
        '커피가게 아저씨를 이용해주셔서 감사합니다. 본 약관은 커피가게 아저씨의 다양한 서비스 이용과 관련하여 커피가게 아저씨 서비스를 제공하는 커피가게 아저씨와 이를 이용하는 커피가게 아저씨 서비스 회원 또는 비회원과의 관계를 설명합니다.',
      state: true,
    }, // state = true (필수)
    {
      name: '개인정보 수집 및 이용 동의',
      detail:
        '개인정보보호법에 따라 커피가게 아저씨에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드립니다.',
      state: true,
    },
    {
      name: '프로모션 정보 수신 동의',
      detail:
        '커피가게 아저씨에서 제공하는 이벤트/혜택 등 다양한 정보를 이메일로 받아보실 수 있습니다. 일부 서비스의 경우, 개별 서비스에 대해 별도 수신 동의를 받을 수 있으며, 이때에도 수신 동의에 대해 별도로 안내하고 동의를 받습니다.',
      state: false,
    }, // state = false (선택)
  ];

  const defaultData =
    '커피가게 아저씨의 이용약관, 개인정보 수집 및 이용, 프로모션 정보 수신(선택)에 모두 동의합니다.';

  const checkedItemHandeler = (name, isChecked) => {
    if (isChecked) {
      setCheckedItems([...checkedItems, name]);
    } else if (!isChecked && checkedItems.find((data) => data === name)) {
      const remain = checkedItems.filter((data) => data !== name);
      setCheckedItems([...remain]);
    }
  };

  const onCheckAll = (item) => {
    if (item) {
      const itemArray = [];
      data.forEach((data) => itemArray.push(data.name));
      setCheckedItems(itemArray);
    } else {
      setCheckedItems([]);
    }
  };

  const cancelHandler = () => {
    navigate('/'); //main page로 이동을 해야하지만 아직 미정이어서 공란 처리
  };

  const okHandler = () => {
    if (checkedItems.includes('커피가게 아저씨 이용약관 동의')) {
      if (checkedItems.includes('개인정보 수집 및 이용 동의')) {
        navigate('/Register');
      }
      return;
    }
    return;
  };

  return (
    <div>
      <div className={style.outter}>
        <div className={style.all}>
          <input
            type="checkbox"
            checked={checkedItems.length === 3 ? true : false}
            onClick={(event) => onCheckAll(event.target.checked)}
          />
          {defaultData}
        </div>
        <div>
          {data.map((data) => (
            <SingleDescription
              name={data.name}
              detail={data.detail}
              state={data.state}
              checkedItems={checkedItems}
              checkedItemHandeler={checkedItemHandeler}
            />
          ))}
        </div>
        <div className={style.low}>
          <input type="button" value="취소" onClick={cancelHandler} className={style.cancel} />
          <input type="button" value="확인" onClick={okHandler} className={style.ok} />
        </div>
      </div>
    </div>
  );
};

export default Description;
