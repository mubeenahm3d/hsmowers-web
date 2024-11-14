import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../authentication/firebase";

export const fetchSubscription = async (uid) => {
  const subsRef = collection(db, "customers", uid, "subscriptions");
  const subsQuery = query(
    subsRef,
    where("status", "in", ["trialing", "active", "past_due", "unpaid"])
  );

  try {
    const subscriptionDocs = await getDocs(subsQuery);
    if (subscriptionDocs.docs.length > 0) {
      let endDate;
      let subscription;
      subscriptionDocs.docs.forEach((doc, index) => {
        console.log("doc", index, doc.data());
        if (!endDate || endDate < doc.data().current_period_end) {
          endDate = doc.data().current_period_end;
          subscription = doc.data();
        }
      });
      console.log("subscriptions", subscription);
      return subscription;
    }
  } catch (e) {
    console.log("Error fetching subscription:", e);
    return null;
  }
};
