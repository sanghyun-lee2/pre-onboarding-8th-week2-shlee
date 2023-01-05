import React, { useEffect, useState } from "react";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import NativeSelect from "@mui/material/NativeSelect";
import Button from "@mui/material/Button";

function toStringDate(epcohSeconds) {
   return formatISOString(epochSecondsToLocalISOString(epcohSeconds));
}

function epochSecondsToLocalISOString(epochSeconds) {
   return new Date(
      epochSeconds * 1000 +
         -new Date(epochSeconds * 1000).getTimezoneOffset() * 60 * 1000
   ).toISOString();
}

function formatISOString(value) {
   return value.replace("Z", "");
}

function IssueModifyDlg(props) {
   const { IssueModify, ItemModify, open, onClose } = props;

   const [issueTitle, setIssueTitle] = useState("");
   const [issueEndDate, setIssueEndDate] = useState();
   const [issueContents, setIssueContents] = useState("");
   const [issueStatus, setIssueStatus] = useState("");

   useEffect(() => {
      if (ItemModify) {
         setIssueTitle(ItemModify.issueTitle);
         //setIssueEndDate(ItemModify.issueEndDate);
         setIssueContents(ItemModify.issueContents);
         setIssueStatus(ItemModify.issueStatus);
      }
   }, [ItemModify]);

   const issueTitleInputHandler = (e) => {
      setIssueTitle(e.target.value);
   };

   const issueEndDateInputHandler = (e) => {
      setIssueEndDate(new Date(e.target.value).getTime() / 1000);
   };

   const issueContentsInputHandler = (e) => {
      setIssueContents(e.target.value);
   };

   const issueStatusChangeHandler = (e) => {
      setIssueStatus(e.currentTarget.value);
   };

   const handleClose = () => {
      onClose();
   };

   const handleModify = () => {
      const issue = {
         id: ItemModify.id,
         issueTitle: issueTitle,
         issueEndDate: "2023-01-04",
         issueContents: issueContents,
         issueStatus: issueStatus,
      };
      IssueModify(issue);
      onClose();
   };

   return (
      <Dialog
         onClose={handleClose}
         open={open}
         fullWidth={true}
         maxWidth={"sm"}
      >
         <DialogTitle>이슈 수정</DialogTitle>
         <Divider />
         <div>
            제목{" "}
            <input
               type="text"
               onChange={issueTitleInputHandler}
               value={issueTitle}
            ></input>
         </div>
         <div>
            마감일{" "}
            <input
               type="datetime-local"
               value={issueEndDate ? toStringDate(issueEndDate) : ""}
               onChange={issueEndDateInputHandler}
            ></input>
         </div>
         <div>
            내용{" "}
            <textarea
               onChange={issueContentsInputHandler}
               value={issueContents}
            ></textarea>
         </div>
         <div>
            상태{" "}
            <NativeSelect
               defaultValue={"todo"}
               inputProps={{
                  status: "todo",
                  id: "uncontrolled-native",
               }}
               onChange={issueStatusChangeHandler}
               value={issueStatus}
            >
               <option value={"todo"}>할 일</option>
               <option value={"progress"}>진행 중</option>
               <option value={"done"}>완료</option>
            </NativeSelect>
         </div>
         <Divider />
         <div>
            <Button variant="outlined" onClick={handleModify}>
               저장
            </Button>
            <Button variant="outlined" onClick={handleClose}>
               취소
            </Button>
         </div>
      </Dialog>
   );
}

export default IssueModifyDlg;
