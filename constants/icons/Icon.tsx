import { IconType } from "@/types/iconType";
import React from "react";
import AcademyIcon from "./Academy";
import BackIcon from "./Back";
import BarIcon from "./Bar";
import Camera from "./Camera";
import CheckIcon from "./Check";
import CircleCheckIcon from "./CircleCheck";
import CircleCloseIcon from "./CircleClose";
import CircleExclaIcon from "./CircleExcla";
import CircleInformIcon from "./CircleInform";
import CloseIcon from "./Close";
import CustomerRefIcon from "./CustomerRef";
import DealerIcon from "./Dealer";
import DeliveryIcon from "./Delivery";
import DeliveryLightIcon from "./DeliveryLight";
import DownArrowIcon from "./DownArrow";
import DownloadIcon from "./Download";
import EditIcon from "./Edit";
import EquipmentIcon from "./Equipment";
import HomeIcon from "./Home";
import MailIcon from "./Mail";
import MinusIcon from "./Minus";
import ModeIcon from "./Mode";
import NextIcon from "./Next";
import NotificationsIcon from "./Notifications";
import NotVisibleIcon from "./NotVisible";
import OrderNoIcon from "./OrderNo";
import OrderOpenerIcon from "./OrderOpener";
import OrdersIcon from "./Orders";
import OrderUpdateIcon from "./OrderUpdate";
import PanelIcon from "./Panel";
import PaperClipIcon from "./PaperClip";
import PassLockIcon from "./PassLock";
import PasswordIcon from "./Password";
import PaymentIcon from "./Payment";
import PeriodIcon from "./Period";
import PhoneIcon from "./Phone";
import PhotosIcon from "./Photos";
import PlusIcon from "./Plus";
import ProductsIcon from "./Products";
import ProfileIcon from "./Profile";
import RightArrowIcon from "./RightArrow";
import SearchIcon from "./Search";
import SegmentedCubeIcon from "./SegmentedCube";
import SellerIcon from "./Seller";
import ServiceFactIcon from "./ServiceFact";
import ShortIcon from "./Short";
import SystemAlertIcon from "./SystemAlert";
import TimeSelectIcon from "./TimeSelect";
import UniverseIcon from "./Universe";
import UserIcon from "./User";
import UsersIcon from "./Users";
import VideoIcon from "./Video";
import VisibleIcon from "./Visible";
import WeightIcon from "./Weight";

const Icon = ({ name, size, color }: IconType) => {
  switch (name) {
    case "bar":
      return <BarIcon size={size} color={color} />;
    case "photos":
      return <PhotosIcon size={size} color={color} />;
    case "close":
      return <CloseIcon size={size} color={color} />;
    case "right-arrow":
      return <RightArrowIcon size={size} color={color} />;
    case "back":
      return <BackIcon size={size} color={color} />;
    case "check":
      return <CheckIcon size={size} color={color} />;
    case "mail":
      return <MailIcon size={size} color={color} />;
    case "password":
      return <PasswordIcon size={size} color={color} />;
    case "circle-close":
      return <CircleCloseIcon size={size} color={color} />;
    case "circle-excla":
      return <CircleExclaIcon size={size} color={color} />;
    case "segmented-cube":
      return <SegmentedCubeIcon size={size} color={color} />;
    case "down-arrow":
      return <DownArrowIcon size={size} color={color} />;
    case "phone":
      return <PhoneIcon size={size} color={color} />;
    case "circle-check":
      return <CircleCheckIcon size={size} color={color} />;
    case "equipment":
      return <EquipmentIcon size={size} color={color} />;
    case "home":
      return <HomeIcon size={size} color={color} />;
    case "products":
      return <ProductsIcon size={size} color={color} />;
    case "academy":
      return <AcademyIcon size={size} color={color} />;
    case "profile":
      return <ProfileIcon size={size} color={color} />;
    case "notifications":
      return <NotificationsIcon size={size} color={color} />;
    case "panel":
      return <PanelIcon size={size} color={color} />;
    case "order-update":
      return <OrderUpdateIcon size={size} color={color} />;
    case "system-alert":
      return <SystemAlertIcon size={size} color={color} />;
    case "circle-inform":
      return <CircleInformIcon size={size} color={color} />;
    case "download":
      return <DownloadIcon size={size} color={color} />;
    case "search":
      return <SearchIcon size={size} color={color} />;
    case "order-no":
      return <OrderNoIcon size={size} color={color} />;
    case "period":
      return <PeriodIcon size={size} color={color} />;
    case "seller":
      return <SellerIcon size={size} color={color} />;
    case "delivery":
      return <DeliveryIcon size={size} color={color} />;
    case "weight":
      return <WeightIcon size={size} color={color} />;
    case "paper-clip":
      return <PaperClipIcon size={size} color={color} />;
    case "service-fact":
      return <ServiceFactIcon size={size} color={color} />;
    case "customer-ref":
      return <CustomerRefIcon size={size} color={color} />;
    case "delivery-light":
      return <DeliveryLightIcon size={size} color={color} />;
    case "payment":
      return <PaymentIcon size={size} color={color} />;
    case "order-opener":
      return <OrderOpenerIcon size={size} color={color} />;
    case "edit":
      return <EditIcon size={size} color={color} />;
    case "short":
      return <ShortIcon size={size} color={color} />;
    case "video":
      return <VideoIcon size={size} color={color} />;
    case "visible":
      return <VisibleIcon size={size} color={color} />;
    case "not-visible":
      return <NotVisibleIcon size={size} color={color} />;
    case "plus":
      return <PlusIcon size={size} color={color} />;
    case "minus":
      return <MinusIcon size={size} color={color} />;
    case "user":
      return <UserIcon size={size} color={color} />;
    case "users":
      return <UsersIcon size={size} color={color} />;
    case "orders":
      return <OrdersIcon size={size} color={color} />;
    case "pass-lock":
      return <PassLockIcon size={size} color={color} />;
    case "dealer":
      return <DealerIcon size={size} color={color} />;
    case "universe":
      return <UniverseIcon size={size} color={color} />;
    case "mode":
      return <ModeIcon size={size} color={color} />;
    case "time-select":
      return <TimeSelectIcon size={size} color={color} />;
    case "camera":
      return <Camera size={size} color={color} />;
    case "next":
      return <NextIcon size={size} color={color} />;
    default:
      return null;
  }
};

export default Icon;
