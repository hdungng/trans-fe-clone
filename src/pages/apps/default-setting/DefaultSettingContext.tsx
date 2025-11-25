// DefaultSettingContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DefaultSettingPageProvider } from './DefaultSettingPageContext';

export interface DefaultSettingData {
  client: any;
  customsProcedureType: number;
  TRASASCustomerId: string | null;
  filterUserId: number | null;
}

interface DefaultSettingContextType extends DefaultSettingData {
  setDefaultSetting: React.Dispatch<React.SetStateAction<DefaultSettingData>>;
}

const DefaultSettingContext = createContext<DefaultSettingContextType | null>(null);

export const DefaultSettingProvider = ({ children }: { children: ReactNode }) => {
  const [defaultSetting, setDefaultSetting] = useState<DefaultSettingData>({
    client: null,
    customsProcedureType: 1,
    TRASASCustomerId: null,
    filterUserId: null
  });

  return (
    <DefaultSettingContext.Provider value={{ ...defaultSetting, setDefaultSetting }}>
      <DefaultSettingPageProvider>
        {children}
      </DefaultSettingPageProvider>
    </DefaultSettingContext.Provider>
  );
};

export const useDefaultSetting = () => {
  const context = useContext(DefaultSettingContext);
  if (!context) {
    throw new Error('useDefaultSetting must be used within a DefaultSettingProvider');
  }
  return context;
};
