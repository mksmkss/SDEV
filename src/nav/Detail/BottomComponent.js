import React from 'react';
import { Grid } from '@mui/material';
import ChatComponent from './Chat';

const styles = {
  container: {
    // 背景色をなくす
    // backgroundColor: 'transparent',
    backgroundColor: 'blue',
  },
};
function BottomComponent() {
  return (
    <Grid container spacing={0} style={styles.container}>
      <Grid item xs={6}>
        {/* <Paper style={{
          padding: '10px', overflow: 'auto', backgroundColor: 'transparent',
        }}
        > */}
        <ChatComponent />
        {/* </Paper> */}
      </Grid>
    </Grid>
  );
}

export default BottomComponent;
