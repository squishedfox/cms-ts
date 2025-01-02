export enum FormFieldType {
  dateTime,
  dateTimeRange,
  date,
  dateRange,
  select,
  multiselect,
  text,
  multitext,
  radio,
  multiRadio,
}

export type FormFieldBase = {
  /**
   * Unique database identifier
   */
  id: string;
  /**
   * Unique name of the form field on a form
   */
  name: string;
  /**
   * Defines the type of form field that can be used
   */
  type: FormFieldType;
  /**
   * Boolean flag for indicating if a field is or isn't enabled and should be returned from the database
   */
  enabled?: boolean;
};

export type DateFormField = FormFieldBase & {
  /**
   * The diration in which the user can go backwards in the date picker relative to today
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  minDiration?: string;
  /**
   * the duration in which the user can go forwards in the date picker relative to today.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  maxDiration?: string;

  /**
   * the default which the user will have selected for them in a calendar. Valid values can
   * be durations for be specific dates
   * @see https://en.wikipedia.org/wiki/ISO_8601#Dates
   */
  default?: string;
};

export type DateRangeFormField = FormFieldBase & {
  start: DateFormField;
  end: DateFormField;
};

export type DateTimeFormField = FormFieldBase & {
  /**
   * The diration in which the user can go backwards in the date picker relative to today
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  minDiration?: string;
  /**
   * the duration in which the user can go forwards in the date picker relative to today.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  maxDiration?: string;

  /**
   * the default which the user will have selected for them in a calendar. Valid values can
   * be durations for be specific dates
   * @see https://en.wikipedia.org/wiki/ISO_8601#Dates
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   */
  default?: string;
};

export type DateTimeRangeFormField = FormFieldBase & {
  start?: DateTimeFormField;
  end?: DateTimeFormField;
};

export type SelectFormField = FormFieldBase & {
  /**
   * Possible options to display to the user
   */
  values?: Array<string>;
  /**
   * The default selected option that the user will select
   */
  default?: string | number;
};

export type MultiSelectFormField = FormFieldBase & {};

export type RadioFormField = FormFieldBase & {
  /**
   * Possible values that can be displayed to the user
   */
  values?: Array<string>;
  /**
   * Default selected value (option) for the user
   */
  default?: string;
};

export type FormField =
  | DateTimeRangeFormField
  | DateTimeFormField
  | DateFormField
  | DateRangeFormField
  | RadioFormField
  | SelectFormField
  | MultiSelectFormField;

export type Form = {
  /**
   * Unique database identifier for the form
   */
  id: string;
  /**
   * Unique name for the form
   */
  name: string;
  createdOn: Date;
  updatedOn: Date;
  updatedBy: string;
  createdBy: string;
  fields: Array<object>;
};
