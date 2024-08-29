import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AlertDialog, Button, Callout, Flex, IconButton, Select, Text, TextArea, TextField } from '@radix-ui/themes';
import * as Toast from '@radix-ui/react-toast';
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { CreateEventLoadingState } from './CreateEventLoadingState/CreateEventLoadingState';
import { SuccessAlertDialog } from "./SuccessAlertDialog/SuccessAlertDialog";
import { DeleteDialog } from "./DeleteDialog/DeleteDialog";
import Link from '../../../public/assets/link.svg';
import TimeZone from '../../../public/assets/time-zone.svg';
import Time from '../../../public/assets/time.svg';
import CalendarSelect from '../../../public/assets/calendar.svg';
import Error from '../../../public/assets/error.svg';
import InfoCircled from '../../../public/assets/info-circled.svg';

import styles from "@/styles/CreateEvent.module.css";

interface CreateEventProps {
  darkMode: boolean;
  loading: boolean;
}

const timeZones = ['Eastern', 'Central', 'Mountain', 'Pacific', 'Alaskan', 'Hawaiian'];

const generateTimeSlots = () => {
  const times = [];
  const periods = ['AM', 'PM'];

  for (let period of periods) {
      for (let hour = 1; hour <= 12; hour++) {
          for (let minute of ['00', '30']) {
              times.push(`${hour}:${minute} ${period}`);
          }
      }
  }

  return times;
}

const timeSlots = generateTimeSlots();
const formKeysTransform = {
  event_name: 'Event Name',
  date: 'Date',
  time_zone: 'Time Zone',
  start_time: 'Start Time',
  end_time: 'End Time',
};

interface IForm {
  event_name?: string;
  date: Date | null;
  time_zone?: string;
  start_time?: string;
  end_time?: string;
  description?: string | null;
  video?: string | null;
}

const schemaAdd: yup.ObjectSchema<IForm> = yup.object().shape({
  event_name: yup.string().required("Event name is required!"),
  date: yup.date().required("Date is required!"),
  time_zone: yup.string().required("Time Zone is required!"),
  start_time: yup.string().required("Start Time is required!"),
  end_time: yup.string().required("End Time is required!"),
  description: yup.string().transform(x => x === '' ? undefined : x).min(15, 'Description must be at least 15 characters'),
  video: yup.string().matches(
    /^https?:/,
    {
      message: "Video link should contain https:",
      excludeEmptyString: true,
    }
  )
});

export const CreateEvent = ({ darkMode, loading }: CreateEventProps) => {
  const [prevValues, setPrevValues] = useState<IForm>({} as IForm);
  const [isGifShow, setIsGifShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [filesFormData, setFilesFormData] = useState<File>();
  const [prevFilesFormData, setPrevFilesFormData] = useState<File>();
  const timerRef = useRef(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, touchedFields }
  } = useForm({
    mode: "all",
    defaultValues: {
      event_name: "",
      description: "",
      video: "",
      date: null,
      time_zone: undefined,
      start_time: undefined,
      end_time: undefined,
    },
    resolver: yupResolver(schemaAdd)
  });

  const { date, time_zone, start_time, end_time } = watch();

  const handleUploadFile = (e: { currentTarget: { files: FileList | null }; }) => 
    e.currentTarget.files && setFilesFormData(e.currentTarget.files[0]);

  const handleDeleteImage = () => setFilesFormData(undefined);

  const handleDeleteClick = () => {
    reset();
    setFilesFormData(undefined);
    setPrevValues({} as IForm);
    setPrevFilesFormData(undefined);
  };
  const handleEdit = () => {
    prevFilesFormData && setFilesFormData(prevFilesFormData);
    Object.keys(prevValues).length > 0 && Object.entries(prevValues).map(el => setValue(el[0], el[1] as never, {
      shouldValidate: true,
      shouldDirty: true
    }))
  };

  const onSubmit = (values: IForm) => {
    setPrevValues(values);
    setPrevFilesFormData(filesFormData);
    window.clearTimeout(timerRef.current);

    reset();
    setFilesFormData(undefined);

    timerRef.current = window.setTimeout(() => {
      setOpen(true);
      setIsGifShow(true);
    }, 100);
    timerRef.current = window.setTimeout(() => {
      setOpen(false);
    }, 7000);
    timerRef.current = window.setTimeout(() => {
      setIsGifShow(false);
    }, 2300);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <Toast.Provider swipeDirection="right">
      <AlertDialog.Root>
        <Flex maxWidth="570px" pt='64px' pb="96px" gap="64px" direction="column">
          {loading ? <CreateEventLoadingState /> : (
            <>
              {Object.keys(errors).length > 0 && Object.keys(touchedFields).length > 0 && (
                <Callout.Root size="1" color='red'>
                  <Callout.Icon>
                    <InfoCircled />
                  </Callout.Icon>
                  <Callout.Text>
                    Missing {Object.keys(errors).map(el => formKeysTransform[el as keyof typeof formKeysTransform]).join()}
                  </Callout.Text>
                </Callout.Root>
              )}

              <Flex gap="16px" direction="column">
                <Text size="6" weight="medium">
                  Create an event
                </Text>
                <Text size="2" weight="light" className={darkMode ? styles.subTitle : styles.lightSubTitle}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                </Text>
              </Flex>

              <Flex gap="8px" direction="column">
                <Text size="3" weight="medium">
                  Event name
                </Text>
                <TextField.Root
                  placeholder="Your event name"
                  size="3"
                  className={`${darkMode ? styles.textField : styles.lightTextField} ${touchedFields.event_name && !!errors.event_name?.message ? styles.error : ''}`}
                  {...register("event_name")}
                />
              </Flex>

              <Flex gap="8px" direction="column">
                <Text size="3" weight="medium">
                  Date & time
                </Text>
                <Flex gap="8px" className={darkMode ? styles.datePicker : styles.lightDatePicker}>
                  <DatePicker
                    showIcon
                    toggleCalendarOnIconClick
                    {...register("date")}
                    selected={date}
                    onChange={(date) => setValue("date", date as never, {
                      shouldValidate: true,
                      shouldDirty: true
                    })}
                    icon={CalendarSelect}
                    placeholderText="Select date(s)..."
                    dateFormat="yyyy/MM/dd"
                  />
                  <Select.Root
                    {...register("time_zone")}
                    size="3"
                    onValueChange={val => setValue("time_zone", val as never, {
                      shouldValidate: true,
                      shouldDirty: true
                    })}
                  >
                    <Select.Trigger
                      // @ts-ignore
                      placeholder={<><TimeZone /> Time zone</>}
                      className={`${darkMode ? styles.select : styles.lightSelect} ${!!errors.time_zone?.message ? styles.error : ''}`}
                    >
                      <TimeZone /> {time_zone}
                    </Select.Trigger>
                    <Select.Content>
                      {timeZones.map(el => (
                        <Select.Item key={el} value={el}>{el}</Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Flex>
                <Flex gap="8px">
                  <Select.Root
                    {...register("start_time")}
                    size="3"
                    onValueChange={val => setValue("start_time", val as never, {
                      shouldValidate: true,
                      shouldDirty: true
                    })}
                  >
                    <Select.Trigger
                      // @ts-ignore
                      placeholder={<><Time /> Start time</>}
                      className={`${darkMode ? styles.select : styles.lightSelect} ${!!errors.start_time?.message ? styles.error : ''}`}
                    >
                      <Time /> {start_time}
                    </Select.Trigger>
                    <Select.Content>
                      {timeSlots.map(el => (
                        <Select.Item key={el} value={el}>{el}</Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                  <Select.Root
                    {...register("end_time")}
                    size="3"
                    onValueChange={val => setValue("end_time", val as never, {
                      shouldValidate: true,
                      shouldDirty: true
                    })}
                  >
                    <Select.Trigger
                      // @ts-ignore
                      placeholder={<><Time /> End time</>}
                      className={`${darkMode ? styles.select : styles.lightSelect} ${!!errors.end_time?.message ? styles.error : ''}`}
                    >
                      <Time /> {end_time}
                    </Select.Trigger>
                    <Select.Content>
                      {timeSlots.map(el => (
                        <Select.Item key={el} value={el}>{el}</Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Flex>
              </Flex>

              <Flex gap="8px" direction="column">
                <Text size="3" weight="medium">
                  Description
                </Text>
                <TextArea
                  size="3"
                  placeholder="Add event description..."
                  className={`${darkMode ? styles.textField : styles.lightTextField} ${touchedFields.description && !!errors.description?.message ? styles.error : ''}`}
                  {...register("description")}
                />
                {touchedFields.description && !!errors.description?.message && (
                  <Text size="1" weight="regular" className={styles.errorColor}>
                    {errors.description.message}
                  </Text>
                )}
              </Flex>

              <Flex gap="16px" direction="column">
                <Flex gap="8px" direction="column">
                  <Text size="3" weight="medium">
                    Video
                  </Text>
                  <TextField.Root
                    placeholder="Add video link..."
                    size="3"
                    className={`${darkMode ? styles.textField : styles.lightTextField} ${touchedFields.video && !!errors.video?.message ? styles.error : ''}`}
                    {...register("video")}
                  >
                    <TextField.Slot>
                      <Link />
                    </TextField.Slot>
                  </TextField.Root>
                  {touchedFields.video && !!errors.video?.message && (
                    <Text size="1" weight="regular" className={styles.errorColor}>
                      {errors.video.message}
                    </Text>
                  )}
                </Flex>
                <Flex gap="8px" direction="column">
                  <Text size="3" weight="medium">
                    Banner image
                  </Text>
                  {filesFormData ? (
                    <Flex gap="32px" height="120px" align="center" className={styles.bannerImage}>
                      <Image src={URL.createObjectURL(filesFormData)} alt="image" width={120} height={120} />
                      <Flex gap="4px" direction="column" className={styles.imageContainer}>
                        <IconButton size="2" variant="soft" onClick={handleDeleteImage}>
                          <Error />
                        </IconButton>
                        <Text size="1" weight="medium">
                          {filesFormData.name}
                        </Text>
                        <Text size="1" weight="light">
                          {(filesFormData.size / (1024*1024)).toFixed(1)}MB
                        </Text>
                      </Flex>
                    </Flex>
                  ) : (
                    <Flex className={darkMode ? styles.dragAndDrop : styles.lightDragAndDrop}>
                      <input type="file" id="file-uploader" accept=".svg, .jpg, .jpeg, .png, .gif" onChange={handleUploadFile} multiple />
                      <Text size="2" weight="regular">
                        <b><u>Click to upload</u></b> or drag and drop <br/> SVG, PNG, JPG or GIF (recommended size 1024x1024px) 
                      </Text>
                    </Flex>
                  )}
                </Flex>
              </Flex>

              <Flex gap="8px">
                <Button size="3" variant="soft" className={darkMode ? styles.createBtn : styles.lightCreateBtn} onClick={handleSubmit(onSubmit)}>
                  Create event
                </Button>
                <AlertDialog.Trigger>
                  <Button size="3" variant="soft" className={darkMode ? styles.cancelBtn : styles.lightCancelBtn}>
                    Cancel
                  </Button>
                </AlertDialog.Trigger>
              </Flex>
            </>
          )}
        </Flex>

        <SuccessAlertDialog
          open={open}
          isGifShow={isGifShow}
          setOpen={setOpen}
          darkMode={darkMode}
          handleEdit={handleEdit}
        />

        <DeleteDialog handleDeleteClick={handleDeleteClick} />
        
      </AlertDialog.Root>
    </Toast.Provider>
  );
};
