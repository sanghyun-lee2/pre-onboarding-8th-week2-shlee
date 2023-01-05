import React, { useState } from "react";

import IssueCreateDlg from "../components/IssueCreateDlg";
import IssueModifyDlg from "../components/IssueModifyDlg";
import IssueCard from "../components/IssueCard";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import "./IssuePage.css";

const issueTemp = [
   {
      id: 1,
      issueTitle: "새로해야 하는 일",
      issueEndDate: "2023-01-04",
      issueContents: "오늘까지",
      issueStatus: "todo",
   },
   {
      id: 2,
      issueTitle: "새로해야 하는 일2",
      issueEndDate: "2023-01-06",
      issueContents: "모레까지",
      issueStatus: "todo",
   },
   {
      id: 3,
      issueTitle: "새로해야 하는 일3",
      issueEndDate: "2023-01-06",
      issueContents: "모레까지",
      issueStatus: "done",
   },
   {
      id: 4,
      issueTitle: "새로해야 하는 일4",
      issueEndDate: "2023-01-06",
      issueContents: "모레까지",
      issueStatus: "progress",
   },
];

function IssuePage() {
   const [issueList, setIssueList] = useState(issueTemp);
   const [modifyIssue, setModifyIssue] = useState();
   const [openCreateDlg, setOpenCreateDlg] = React.useState(false);
   const [openModifyDlg, setOpenModifyDlg] = React.useState(false);

   const createIssueItem = (issueData) => {
      issueData.id = issueList.length + 1;
      //setIssueList([...issueList], issueData);
      setIssueList(issueList.concat(issueData));
   };

   const modifyIssueItem = (issueData) => {
      const newIssueList = issueList.map((issue) => {
         if (issue.id === issueData.id) {
            return issueData;
         } else {
            return issue;
         }
      });
      setIssueList(newIssueList);
      console.log(newIssueList);
   };

   const handleCreateDlgOpen = () => {
      setOpenCreateDlg(true);
   };

   const handleCreateDlgClose = () => {
      setOpenCreateDlg(false);
   };

   const handleModifyDlgOpen = async (issue) => {
      setModifyIssue(issue);
      setOpenModifyDlg(true);
   };

   const handleModifyDlgClose = () => {
      setOpenModifyDlg(false);
   };

   return (
      <div>
         <Button variant="outlined" onClick={handleCreateDlgOpen}>
            새로 만들기
         </Button>
         <IssueCreateDlg
            IssueCreate={createIssueItem}
            open={openCreateDlg}
            onClose={handleCreateDlgClose}
         />
         <IssueModifyDlg
            IssueModify={modifyIssueItem}
            ItemModify={modifyIssue}
            open={openModifyDlg}
            onClose={handleModifyDlgClose}
         />
         <div className="issue-list-container">
            {/* 할일 */}
            {issueList.map((issue, index) => {
               if (issue.issueStatus === "todo") {
                  return (
                     <React.Fragment key={index}>
                        <Divider />
                        <IssueCard
                           info={issue}
                           IssueModifyOpen={handleModifyDlgOpen}
                        />
                     </React.Fragment>
                  );
               }
            })}
            {/* 진행중 */}
            {issueList.map((issue, index) => {
               if (issue.issueStatus === "progress") {
                  return (
                     <React.Fragment key={index}>
                        <Divider />
                        <IssueCard
                           info={issue}
                           IssueModifyOpen={handleModifyDlgOpen}
                        />
                     </React.Fragment>
                  );
               }
            })}
            {/* 완료 */}
            {issueList.map((issue, index) => {
               if (issue.issueStatus === "done") {
                  return (
                     <React.Fragment key={index}>
                        <Divider />
                        <IssueCard
                           info={issue}
                           IssueModifyOpen={handleModifyDlgOpen}
                        />
                     </React.Fragment>
                  );
               }
            })}
         </div>
      </div>
   );
}

export default IssuePage;
