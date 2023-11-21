/* eslint-disable @next/next/no-img-element */
import { database } from "@/firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

interface arrayData {
  id: string;
  positionId: string;
  email?: string;
  folderName?: string;
  isFolder?: boolean;
  downloadURL?: string;
  fileName?: string;
  fileType?: string;
}

const files = collection(database, "files");

const GetFile = (positionId: string) => {
  const { data: session } = useSession();
  const email = session?.user.email;
  const [data, setdata] = useState<arrayData[]>([]);

  const validEmail = useCallback(() => {
    if (email) {
      return query(files, where("email", "==", email));
    } else {
      window.location.href = "http://localhost:3000/";
      return query(files, where("email", "==", "not same"));
    }
  }, [email]);

  useEffect(() => {
    const unsubscribe = onSnapshot(validEmail(), (respone) => {
      const newData = respone.docs
        .map((a) => {
          const data = a.data() as { positionId: string };
          return {
            id: a.id,
            ...data,
          };
        })
        .filter((a) => a.positionId === positionId);

      setdata(newData);
    });

    return unsubscribe;
  }, [validEmail, positionId]);
  return data;
};

import { AiFillFolder } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
const ShowFile = ({ positionId }: { positionId: string }) => {
  const data = GetFile(positionId);
  const router = useRouter();
  return (
    <div className=" m-16 flex flex-wrap justify-center gap-20 ">
      {data.map((a) => (
        <div className="relative" key={a.id}>
          {a.isFolder ? (
            <div
              onClick={() => {
                void router.push(`folder?id=${a.id}`);
              }}
              className=" z-50 mb-2 flex h-72 w-64 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl bg-slate-500 bg-cover"
            >
              <AiFillFolder className="h-40 w-36" />
              <span className="absolute top-52 text-xl">{a.folderName}</span>
            </div>
          ) : (
            <div
              onClick={() => window.open(a.downloadURL)}
              className="mb-2 flex h-72 w-64 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl bg-slate-500 bg-cover"
            >
              {a.fileType === "image/jpeg" ? (
                <img className="h-72 w-64" src={a.downloadURL} alt="image" />
              ) : (
                <>
                  <IoDocumentTextOutline className="h-36 w-32" />
                  <span className="text-xl">{a.fileName}</span>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default ShowFile;
