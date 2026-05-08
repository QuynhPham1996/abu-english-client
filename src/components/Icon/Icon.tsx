import React from 'react';
import classNames from 'classnames';

import { TIconProps } from './Icon.types';
import { EIconName } from './Icon.enums';

import AngleRight from './AngleRight';
import AngleLeft from './AngleLeft';
import AngleDown from './AngleDown';
import Eye from './Eye';
import EyeClosed from './EyeClosed';
import Facebook from './Facebook';
import Messenger from './Messenger';
import Bell from './Bell';
import Book from './Book';
import Book2 from './Book2';
import Books from './Books';
import Power from './Power';
import User from './User';
import X from './X';
import Lock from './Lock';
import Check from './Check';
import Menu from './Menu';
import ChartBar from './ChartBar';
import Clock from './Clock';
import Users from './Users';
import Reload from './Reload';
import Help from './Help';
import ArrowLeft from './ArrowLeft';
import Alarm from './Alarm';
import ClipboardText from './ClipboardText';
import Mail from './Mail';
import Phone from './Phone';
import Calendar from './Calendar';
import Pencil from './Pencil';
import Plus from './Plus';
import UsersGroup from './UsersGroup';
import NoteBook from './NoteBook';
import Trash from './Trash';
import Copy from './Copy';
import BrandRedux from './BrandRedux';
import AntennaBars from './AntennaBars';
import Search from './Search';
import InfoCircle from './InfoCircle';
import Highlight from './Highlight';
import NorthStar from './NorthStar';
import Dots from './Dots';
import Movie from './Movie';
import MoodEmpty from './MoodEmpty';
import ArrowShuffle from './ArrowShuffle';
import GripVertical from './GripVertical';
import CircleCheck from './CircleCheck';
import CircleWarning from './CircleWarning';
import CircleX from './CircleX';
import CircleInfo from './CircleInfo';
import Key from './Key';
import BellBolt from './BellBolt';
import DirectionSign from './DirectionSign';
import Writing from './Writing';
import Checkbox from './Checkbox';
import Send from './Send';
import FileCheck from './FileCheck';
import Quote from './Quote';

const Icon: React.FC<TIconProps> = ({ name, className, color, style, onClick }) => {
  const renderIcon = (): React.ReactElement => {
    switch (name) {
      case EIconName.AngleRight:
        return <AngleRight color={color} />;
      case EIconName.AngleLeft:
        return <AngleLeft color={color} />;
      case EIconName.AngleDown:
        return <AngleDown color={color} />;
      case EIconName.Eye:
        return <Eye color={color} />;
      case EIconName.EyeClosed:
        return <EyeClosed color={color} />;
      case EIconName.Facebook:
        return <Facebook color={color} />;
      case EIconName.Messenger:
        return <Messenger color={color} />;
      case EIconName.Bell:
        return <Bell color={color} />;
      case EIconName.Book:
        return <Book color={color} />;
      case EIconName.Book2:
        return <Book2 color={color} />;
      case EIconName.Books:
        return <Books color={color} />;
      case EIconName.User:
        return <User color={color} />;
      case EIconName.Power:
        return <Power color={color} />;
      case EIconName.X:
        return <X color={color} />;
      case EIconName.Lock:
        return <Lock color={color} />;
      case EIconName.Check:
        return <Check color={color} />;
      case EIconName.Menu:
        return <Menu color={color} />;
      case EIconName.ChartBar:
        return <ChartBar color={color} />;
      case EIconName.Clock:
        return <Clock color={color} />;
      case EIconName.Users:
        return <Users color={color} />;
      case EIconName.Reload:
        return <Reload color={color} />;
      case EIconName.Help:
        return <Help color={color} />;
      case EIconName.ArrowLeft:
        return <ArrowLeft color={color} />;
      case EIconName.Alarm:
        return <Alarm color={color} />;
      case EIconName.ClipboardText:
        return <ClipboardText color={color} />;
      case EIconName.Phone:
        return <Phone color={color} />;
      case EIconName.Mail:
        return <Mail color={color} />;
      case EIconName.Calendar:
        return <Calendar color={color} />;
      case EIconName.Pencil:
        return <Pencil color={color} />;
      case EIconName.Plus:
        return <Plus color={color} />;
      case EIconName.UsersGroup:
        return <UsersGroup color={color} />;
      case EIconName.NoteBook:
        return <NoteBook color={color} />;
      case EIconName.Trash:
        return <Trash color={color} />;
      case EIconName.Copy:
        return <Copy color={color} />;
      case EIconName.BrandRedux:
        return <BrandRedux color={color} />;
      case EIconName.AntennaBars:
        return <AntennaBars color={color} />;
      case EIconName.Search:
        return <Search color={color} />;
      case EIconName.InfoCircle:
        return <InfoCircle color={color} />;
      case EIconName.Highlight:
        return <Highlight color={color} />;
      case EIconName.NorthStar:
        return <NorthStar color={color} />;
      case EIconName.Dots:
        return <Dots color={color} />;
      case EIconName.Movie:
        return <Movie color={color} />;
      case EIconName.MoodEmpty:
        return <MoodEmpty color={color} />;
      case EIconName.ArrowShuffle:
        return <ArrowShuffle color={color} />;
      case EIconName.GripVertical:
        return <GripVertical color={color} />;
      case EIconName.CircleCheck:
        return <CircleCheck color={color} />;
      case EIconName.CircleWarning:
        return <CircleWarning color={color} />;
      case EIconName.CircleX:
        return <CircleX color={color} />;
      case EIconName.CircleInfo:
        return <CircleInfo color={color} />;
      case EIconName.Key:
        return <Key color={color} />;
      case EIconName.BellBolt:
        return <BellBolt color={color} />;
      case EIconName.DirectionSign:
        return <DirectionSign color={color} />;
      case EIconName.Writing:
        return <Writing color={color} />;
      case EIconName.Checkbox:
        return <Checkbox color={color} />;
      case EIconName.Send:
        return <Send color={color} />;
      case EIconName.FileCheck:
        return <FileCheck color={color} />;
      case EIconName.Quote:
        return <Quote color={color} />;

      default:
        return <></>;
    }
  };

  return (
    <div
      className={classNames('Icon', 'flex', 'justify-center', 'items-center', className)}
      onClick={onClick}
      style={style}
    >
      {renderIcon()}
    </div>
  );
};

export default Icon;
