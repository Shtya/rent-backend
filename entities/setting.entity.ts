import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


interface ButtonColors {
  background: string;
  hoverBackground: string;
  text: string;
  hoverText: string;
  border: string;
  hoverBorder: string;
}

interface ColorSystem {
  primary: string;
  secondary: string;
  tertiary: string;

  textPrimary: string;
  textSecondary: string;
  textTertiary: string;

  background: string;
  backgroundAlt: string;

  border: string;
  borderSecondary: string;

  button: ButtonColors;
  secondaryButton: ButtonColors;

  disabled: {
    background: string;
    text: string;
    border: string;
  };

  success: string;
  warning: string;
  danger: string;
  info: string;
}



@Entity()
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  site_name: { ar: string; en: string };

  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  site_description: { ar: string; en: string };


  // save the fav services ids []
  // best service as pin also 
  // save the fav product ids []
  // about the app
  
  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  terms_condition: { ar: string; en: string };

  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  privacy_policy: { ar: string; en: string };

  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  security_policy: { ar: string; en: string };


  @Column({ type: 'jsonb' })
  colors: ColorSystem;


  @Column()
  logo_url: string;

  @Column()
  favicon_url: string;

  @Column()
  currency: string;

  @Column()
  support_email: string;

  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  support_phone: { ar: string; en: string };

  @Column()
  booking_terms_url: string;

  @Column()
  privacy_policy_url: string;

  @Column('jsonb')
  social_links: any;

  @Column('text')
  header_scripts: string;

  @Column('text')
  footer_scripts: string;

  @Column('jsonb')
  smtp_config: any;
}





/*

{
  "colors": {
    "primary": "#007bff",
    "secondary": "#6c757d",
    "tertiary": "#f8f9fa",

    "textPrimary": "#212529",
    "textSecondary": "#6c757d",
    "textTertiary": "#adb5bd",

    "background": "#ffffff",
    "backgroundAlt": "#f1f3f5",

    "border": "#dee2e6",
    "borderSecondary": "#ced4da",

    "button": {
      "background": "#007bff",
      "hoverBackground": "#0056b3",
      "text": "#ffffff",
      "hoverText": "#ffffff",
      "border": "#007bff",
      "hoverBorder": "#0056b3"
    },
    "secondaryButton": {
      "background": "#6c757d",
      "hoverBackground": "#5a6268",
      "text": "#ffffff",
      "hoverText": "#ffffff",
      "border": "#6c757d",
      "hoverBorder": "#5a6268"
    },
    "disabled": {
      "background": "#e0e0e0",
      "text": "#a1a1a1",
      "border": "#c2c2c2"
    },

    "success": "#28a745",
    "warning": "#ffc107",
    "danger": "#dc3545",
    "info": "#17a2b8"
  }
}


*/
