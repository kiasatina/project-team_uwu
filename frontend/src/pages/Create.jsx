import React from "react";
import { PageLayout, PageContent, Sidenav } from "../components";
import { Grid } from "semantic-ui-react";

export default () => {
  return (
    <PageLayout>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <PageContent>Content</PageContent>
          </Grid.Column>
          <Grid.Column width={4}>
            <Sidenav>Sidenav</Sidenav>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </PageLayout>
  );
};
