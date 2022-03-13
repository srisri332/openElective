import React, { useEffect, useState } from "react";
import SubjectModal from "./SubjectModal";

function AdminMainPage() {
  const [oes, setOes] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/OES")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setOes(data);
        // console.log(data);
      });
  }, []);

  const OneSub = (props) => {
    console.log(props.s);
    return <></>;
  };

  const OneOe = (props) => {
    const data = props.subs;
    //     console.log(data);

    let arr = [];

    Object.entries(data).map(([key, value]) => {
      data[key].map((d) => {
        arr = [...arr, d];
      });
    });

    console.log(arr);
    return (
      <>
        {arr.map((d) => {
          return <h1>{d.Name}</h1>;
        })}
      </>
    );
  };

  const DeArray = (props) => {
    const oess = props.data;
    return (
      <>
        <h1>Superman</h1>
        {oess.map((d) => {
          return (
            <>
              <OneOe subs={d} />
            </>
          );
        })}
      </>
    );
  };

  const s = [1, 2, 3, 4];

  return (
    <div>
      <h1>Admin Main Page</h1>
      {oes && <DeArray data={oes} />}
      <SubjectModal />
    </div>
  );
}

export default AdminMainPage;
