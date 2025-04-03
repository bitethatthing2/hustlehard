import { FC } from 'react';
import OrderOptions from '@/components/menu/OrderOptions';
import { Separator } from '@/components/ui/separator';
import PageHeader from '@/components/shared/PageHeader';

const OrderPage: FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader 
        title="Order Online"
        subtitle="Get the full Side Hustle Bar experience delivered or available for pickup"
      />
      
      <OrderOptions />
    </div>
  );
};

export default OrderPage; 