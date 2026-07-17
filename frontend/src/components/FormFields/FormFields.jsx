import { URLFields } from './URLFields';
import { TextFields } from './TextFields';
import { EmailFields } from './EmailFields';
import { PhoneFields } from './PhoneFields';  // ✅ Mayúsculas correctas
import { SMSFields } from './SMSFields';
import { WiFiFields } from './WiFiFields';     // ✅ Mayúsculas correctas
import { VCardFields } from './VCardFields';

export const FormFields = ({ category, formData, onFormChange }) => {

  switch (category) {
    case 'url':
      return <URLFields formData={formData} onFormChange={onFormChange} />;
    case 'text':
      return <TextFields formData={formData} onFormChange={onFormChange} />;
    case 'email':
      return <EmailFields formData={formData} onFormChange={onFormChange} />;
    case 'phone':
      return <PhoneFields formData={formData} onFormChange={onFormChange} />;
    case 'sms':
      return <SMSFields formData={formData} onFormChange={onFormChange} />;
    case 'wifi':
      return <WiFiFields formData={formData} onFormChange={onFormChange} />;
    case 'vcard':
      return <VCardFields formData={formData} onFormChange={onFormChange} />;
    default:
      return <URLFields formData={formData} onFormChange={onFormChange} />;
  }
};