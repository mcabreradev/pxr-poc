import { fireEvent, render, screen } from '@testing-library/react';

import Card from './card';

describe('Card component', () => {
  it('should renders Card component correctly', () => {
    render(
      <Card
        id='1'
        name='Card test'
        description='Description test'
        maxCapacity={2}
        standardCapacity={2}
        rate={100}
        image='/hotel/hotel.jpg'
        onClick={() => {}}
      />,
    );
    const element = screen.getByText('Card test');
    expect(element).toBeInTheDocument();
  });

  it('should display the correct name', () => {
    render(
      <Card
        id='1'
        name='Card test'
        description='Description test'
        maxCapacity={2}
        standardCapacity={2}
        rate={100}
        image='/hotel/hotel.jpg'
        onClick={() => {}}
      />,
    );
    const element = screen.getByText('Card test');
    expect(element).toBeInTheDocument();
  });

  it('should display the correct description', () => {
    render(
      <Card
        id='1'
        name='Card test'
        description='Description test'
        maxCapacity={2}
        standardCapacity={2}
        rate={100}
        image='/hotel/hotel.jpg'
        onClick={() => {}}
      />,
    );
    const element = screen.getByText('Description test');
    expect(element).toBeInTheDocument();
  });

  it('should display the correct image', () => {
    render(
      <Card
        id='1'
        name='Card test'
        description='Description test'
        maxCapacity={2}
        standardCapacity={2}
        rate={100}
        image='/hotel/hotel.jpg'
        onClick={() => {}}
      />,
    );
    const element = screen.getByAltText('Card test');
    expect(element).toBeInTheDocument();
  });

  it('should call onClick function when clicked', () => {
    const onClickMock = jest.fn();
    render(
      <Card
        id='1'
        name='Card test'
        description='Description test'
        maxCapacity={2}
        standardCapacity={2}
        rate={100}
        image='/hotel/hotel.jpg'
        onClick={onClickMock}
      />,
    );
    const element = screen.getByTestId('test-card-element');
    fireEvent.click(element);
    expect(onClickMock).toHaveBeenCalled();
  });
});
