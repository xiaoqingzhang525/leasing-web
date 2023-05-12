import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardContent, Typography, Alert } from '@mui/material';
import { v4 as uuid } from 'uuid';

import { getHousingInfos } from '../../integrations/housingFetch';
import { getHousingInfosById, getAlert } from '../../reducers/housingReducer';
import styles from '../../styles/housing.module.css';

export const Housing = (props) => {
  const { housingInfos, getHousingInfos, getHousingInfosById, alert } = props;

  useEffect(() => {
    getHousingInfos();
  }, []);

  const getNewestHousingDetails = (id) => {
    getHousingInfosById(id);
  };

  return (
    <div className={styles.root}>
      {alert && <Alert severity="error">{alert}</Alert>}
      <p>附近的房源：</p>
      <Button variant="contained" onClick={getHousingInfos}>
        刷新
      </Button>
      {housingInfos.map((housingInfo) => {
        const {
          id,
          address,
          city,
          state,
          zipcode,
          price,
          bedrooms,
          bathrooms,
        } = housingInfo;
        return (
          <Card key={uuid()} className={styles.cardItem}>
            <CardContent>
              <h2>
                {address}, {city}, {state} {zipcode}
              </h2>
              <Typography variant="body1" color="textSecondary" component="p">
                ${price}/month
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {bedrooms} bed / {bathrooms} bath
              </Typography>
              <Button
                variant="contained"
                onClick={() => getNewestHousingDetails(id)}
              >
                查看详情
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    housingInfos: state.housingReducer.housingInfos,
    alert: getAlert(state),
  };
};

const mapDispatchToProps = { getHousingInfos, getHousingInfosById };

export default connect(mapStateToProps, mapDispatchToProps)(Housing);
