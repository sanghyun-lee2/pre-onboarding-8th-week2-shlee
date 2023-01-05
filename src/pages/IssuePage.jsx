import React, { useState } from "react";

import IssueCreateDlg from "../components/IssueCreateDlg";
import IssueModifyDlg from "../components/IssueModifyDlg";
import IssueCardList from "../components/IssueCardList";

import Button from "@mui/material/Button";

import styled from "styled-components";

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
      const newIssueList = issueList.concat(issueData);
      setIssueList(newIssueList);
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
         <FlexColumn>
            <Button variant="outlined" onClick={handleCreateDlgOpen}>
               새로 만들기
            </Button>
            <Container>
               <IssueCardList
                  Title={"할 일"}
                  List={issueList.filter(
                     (issue) => issue.issueStatus === "todo"
                  )}
                  IssueModifyOpen={handleModifyDlgOpen}
               ></IssueCardList>
               <IssueCardList
                  Title={"진행 중"}
                  List={issueList.filter(
                     (issue) => issue.issueStatus === "progress"
                  )}
                  IssueModifyOpen={handleModifyDlgOpen}
               ></IssueCardList>
               <IssueCardList
                  Title={"완료"}
                  List={issueList.filter(
                     (issue) => issue.issueStatus === "done"
                  )}
                  IssueModifyOpen={handleModifyDlgOpen}
               ></IssueCardList>
            </Container>
         </FlexColumn>
      </div>
   );
}

export const FlexColumn = styled.div`
   display: flex;
   flex-direction: column;
`;

export const Container = styled.div`
   display: flex;
   justify-content: center;
`;

export default IssuePage;
