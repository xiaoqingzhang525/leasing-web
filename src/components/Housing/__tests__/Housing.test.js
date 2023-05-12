import React from 'react';
import { render, screen, fireEvent, getByText } from '@testing-library/react';
import { Housing } from '../Housing';
import '@testing-library/jest-dom/extend-expect';
import housingMockData from '../../../mocks/data/housingInfos.json';

describe('Housing', () => {
  let props;
  let wrapper;
  const getHousingInfosMockFn = jest.fn();
  const getHousingInfosByIdMockFn = jest.fn();
  beforeEach(() => {
    props = {
      housingInfos: housingMockData,
      getHousingInfos: getHousingInfosMockFn,
      getHousingInfosById: getHousingInfosByIdMockFn,
    };

    wrapper = <Housing {...props} />;
  });
  it('renders housing info names', () => {
    render(wrapper);

    expect(screen.getByText('附近的房源：')).toBeInTheDocument();
    expect(screen.getByText('$2000/month')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '刷新' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: '123 Main Street, New York, NY 10001',
      })
    ).toBeInTheDocument();
  });

  it('should call correct actions when click page', () => {
    render(wrapper);
    const refreshBtn = screen.getByText('刷新');
    console.log(refreshBtn);
    fireEvent.click(refreshBtn);
    expect(getHousingInfosMockFn).toHaveBeenCalled();

    const detailsBtn = screen.getAllByRole('button')[1];
    fireEvent.click(detailsBtn);
    expect(getHousingInfosByIdMockFn).toHaveBeenCalledWith(1);
  });
});
