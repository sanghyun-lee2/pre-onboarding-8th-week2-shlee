import React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

function IssueCardList(props) {
   const { Title, List, IssueModifyOpen } = props;

   const onClickCard = (issue) => {
      IssueModifyOpen(issue);
   };

   return (
      <div>
         <h3>{Title}</h3>
         {List.length === 0 && (
            <div className="empty-notice">등록된 이슈가 없습니다.</div>
         )}
         {List.map((issue, index) => {
            return (
               <Card
                  sx={{ minWidth: 275 }}
                  style={{
                     backgroundColor: "#BBDEFB",
                     margin: "7px",
                     cursor: "pointer",
                  }}
                  onClick={() => onClickCard(issue)}
                  key={index}
               >
                  <CardActions>
                     <Button size="small">{issue.issueTitle}</Button>
                  </CardActions>
               </Card>
            );
         })}
      </div>
   );
}

export default IssueCardList;
