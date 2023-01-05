import React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

function IssueCard(props) {
   const { info, IssueModifyOpen } = props;

   const onClickCard = (e) => {
      IssueModifyOpen(info);
   };

   return (
      <Card sx={{ minWidth: 275 }}>
         <CardActions>
            <Button size="small" onClick={onClickCard}>
               {info.issueTitle}
            </Button>
         </CardActions>
      </Card>
   );
}

export default IssueCard;
