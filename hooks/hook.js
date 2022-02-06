import { useQuery } from "react-query";
import { query, collection, getDocs } from "firebase/firestore";
import { database, firestore } from "../config/apikeys";

const dbInstance = collection(database, "passengers");

function usePassengerData() {
  const result = useQuery({
    queryKey: "passenger-data",
    queryFn: () => {
      getDocs(dbInstance)
        .then((data) => {
          console.log(data, "data");
          return data.docs.map((item) => {
            return { ...item.data(), id: item.id };
          });
        })
        .catch((err) => console.log("err", err));
    },
  });

  console.log(result, "result");

  //   const resultFormatted =
  //     result.data &&
  //     result.data.map((detail) => {
  //       return {
  //         name: detail.data().name,
  //         address: detail.data().address,
  //         contact: detail.data().contact,
  //         from: detail.data().from,
  //         to: detail.data().to,
  //         date: detail.data().date,
  //       };
  //     });
  return { ...result, passengers: [] };
}

export { usePassengerData };
