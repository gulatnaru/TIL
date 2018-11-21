import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import faker from "faker";
import CommentDetail from "./CommentDetail";
import ApprovalCard from "./ApprovalCard";
import Message from "./Message";
import Segment from "./Segment";

const App = () => {
  return (
    <Fragment>
      <Segment>
        <div className="ui icon header">
          <i className="pdf file outline icon">No Document</i>
        </div>
        
        <div className="ui primary button">Add document</div>
      </Segment>

      <Segment>
        <h4 className="ui header">
          For Your Infromation!
        </h4>
        <p>
          {faker.lorem.paragraph()}
        </p>
      </Segment>

      <Message header="회원 약관 변경" body="약관이 변경되었습니다. 동의하실거죠?" />
      
      <div className="ui container comments">
        
        <ApprovalCard>
          <h4>오늘 새벽까지 복습한다.</h4>
          <p>빡공각?</p>
        </ApprovalCard>

        <ApprovalCard>
          <CommentDetail
            author={faker.name.firstName()}
            time={faker.date.recent().toLocaleString()}
            body={faker.lorem.sentence()}
            avatar={faker.image.avatar()}
          />
        </ApprovalCard>
      </div>
    </Fragment>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
