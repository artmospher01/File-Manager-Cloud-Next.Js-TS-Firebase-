import ButtonLogin from "@/components/buttonLogin";
import uploadFile from "@/handleFirebase/addFile";
import addFolder from "@/handleFirebase/addFolder";
import ShowFile from "@/handleFirebase/showFile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Folder() {
  const [visibleCreateFolder, setvisibleCreateFolder] = useState(false);
  const [folderName, setfolderName] = useState("");
  const [progres, setprogres] = useState(0);
  const [upploadSuccess, setupploadSuccess] = useState(false);
  const [positionId, setpositionId] = useState("root");
  const { data: session } = useSession();
  const email = session?.user.email;
  const route = useRouter();

  useEffect(() => {
    const queryId = route.query.id;

    if (typeof queryId === "string") {
      setpositionId(queryId);
    }
  }, [route.query.id]);

  useEffect(() => {
    if (progres == 100) {
      setupploadSuccess(true);

      setTimeout(() => {
        setprogres(0);
        setupploadSuccess(false);
      }, 2000);
    }
  }, [progres]);

  const submitCreateFolder = () => {
    if (email) {
      const payload = {
        folderName,
        email,
        positionId,
      };
      void addFolder(payload);
      setfolderName("");
      setvisibleCreateFolder(false);
    }
  };
  return (
    <div className="bg flex-1">
      <div className="absolute right-6 top-6 flex">
        <ButtonLogin />
      </div>
      {email && (
        <>
          <div className="mx-8 mt-6 flex gap-10">
            <label htmlFor="addFile" className="btn btn-primary">
              Add a File
              <input
                type="file"
                id="addFile"
                name="addFile"
                hidden
                onChange={(e) => {
                  const selectedFile = e.target.files
                    ? e.target.files[0]
                    : null;
                  if (selectedFile) {
                    uploadFile(selectedFile, setprogres, email, positionId);
                  }
                }}
              />
            </label>
            <div className="flex gap-2">
              <label
                className="btn btn-success"
                htmlFor="createFolder"
                onClick={() =>
                  setvisibleCreateFolder(() => !visibleCreateFolder)
                }
              >
                Create a Folder
              </label>
              {visibleCreateFolder && (
                <div>
                  <input
                    type="text"
                    id="createFolder"
                    name="createFolder"
                    placeholder="Type folder name"
                    className="input input-bordered input-primary mr-1 w-48 max-w-xs"
                    value={folderName}
                    onChange={(e) => setfolderName(e.target.value)}
                  />
                  <button
                    onClick={submitCreateFolder}
                    className="btn btn-outline btn-info"
                  >
                    Create Folder
                  </button>
                </div>
              )}
            </div>
          </div>
          {progres === 0 ? (
            <></>
          ) : upploadSuccess ? (
            <div className="alert alert-success flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Upload File was Successfull</span>
            </div>
          ) : (
            <progress
              className="progress progress-success m-5 w-2/4"
              value={progres}
              max="100"
            ></progress>
          )}
          <ShowFile positionId={positionId} />
        </>
      )}
    </div>
  );
}
