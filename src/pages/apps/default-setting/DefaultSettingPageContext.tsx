// DefaultSettingPageContext.tsx
import {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    Dispatch
} from 'react';
import { ClientType } from 'types/pages/client';
import { mockFormImportDefault } from '../job-number/form/formik/ImportDefaultFormik';
import { mockFormExportDefault } from '../job-number/form/formik/ExportDefaultFormik';

type DocumentSelectionTab = 'existing' | 'new';

export interface DefaultSettingDocument {
    id: number;
    name: string;
    method: string;
    tax_code: string;
    customs_procedure_type: number;
    customer?: string | null;
    user_id?: number | null;
    import_type_code?: string;
    data: any;
}

export interface DefaultSettingPageState {
    tab: number;

    filterClient: ClientType | null;
    filterUserId?: number;
    TRASASCustomerId?: string;

    method: string; // 'import' | 'export'
    customsProcedureType: number;
    isLoading: boolean;

    defaultValuesData: any;
    documents: DefaultSettingDocument[];
    selectedDocument: DefaultSettingDocument | null;
    documentName: string;
    documentListLoading: boolean;
    activeStep: number;
    documentSelectionTab: DocumentSelectionTab;
    importTypeCode: string;
}

type Action =
    | { type: 'SET_TAB'; payload: number }
    | { type: 'SET_FILTER_CLIENT'; payload: ClientType | null }
    | { type: 'SET_FILTER_USER_ID'; payload: number | undefined }
    | { type: 'SET_TRASAS_CUSTOMER_ID'; payload: string | undefined }
    | { type: 'SET_METHOD'; payload: string }
    | { type: 'SET_CUSTOMS_PROCEDURE_TYPE'; payload: number }
    | { type: 'SET_IS_LOADING'; payload: boolean }
    | { type: 'SET_DEFAULT_VALUES_DATA'; payload: any }
    | { type: 'SET_DOCUMENTS'; payload: DefaultSettingDocument[] }
    | { type: 'SET_SELECTED_DOCUMENT'; payload: DefaultSettingDocument | null }
    | { type: 'SET_DOCUMENT_NAME'; payload: string }
    | { type: 'SET_DOCUMENT_LIST_LOADING'; payload: boolean }
    | { type: 'SET_ACTIVE_STEP'; payload: number }
    | { type: 'SET_DOCUMENT_SELECTION_TAB'; payload: DocumentSelectionTab }
    | { type: 'SET_IMPORT_TYPE_CODE'; payload: string };

const initialState: DefaultSettingPageState = {
    tab: 1,
    filterClient: null,
    filterUserId: undefined,
    TRASASCustomerId: undefined,
    method: 'import',
    customsProcedureType: 0,
    isLoading: false,
    defaultValuesData: mockFormImportDefault,
    documents: [],
    selectedDocument: null,
    documentName: '',
    documentListLoading: false,
    activeStep: 0,
    documentSelectionTab: 'existing',
    importTypeCode: ''
};

function reducer(state: DefaultSettingPageState, action: Action): DefaultSettingPageState {
    switch (action.type) {
        case 'SET_TAB':
            return { ...state, tab: action.payload };
        case 'SET_FILTER_CLIENT':
            return { ...state, filterClient: action.payload };
        case 'SET_FILTER_USER_ID':
            return { ...state, filterUserId: action.payload };
        case 'SET_TRASAS_CUSTOMER_ID':
            return { ...state, TRASASCustomerId: action.payload };
        case 'SET_METHOD':
            return {
                ...state,
                method: action.payload,
                defaultValuesData:
                    action.payload === 'import' ? mockFormImportDefault : mockFormExportDefault
            };
        case 'SET_CUSTOMS_PROCEDURE_TYPE':
            return { ...state, customsProcedureType: action.payload };
        case 'SET_IS_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_DEFAULT_VALUES_DATA':
            return { ...state, defaultValuesData: action.payload };
        case 'SET_DOCUMENTS':
            return { ...state, documents: action.payload };
        case 'SET_SELECTED_DOCUMENT':
            return { ...state, selectedDocument: action.payload };
        case 'SET_DOCUMENT_NAME':
            return { ...state, documentName: action.payload };
        case 'SET_DOCUMENT_LIST_LOADING':
            return { ...state, documentListLoading: action.payload };
        case 'SET_ACTIVE_STEP':
            return { ...state, activeStep: action.payload };
        case 'SET_DOCUMENT_SELECTION_TAB':
            return { ...state, documentSelectionTab: action.payload };
        case 'SET_IMPORT_TYPE_CODE':
            return { ...state, importTypeCode: action.payload };
        default:
            return state;
    }
}

interface DefaultSettingContextValue {
    state: DefaultSettingPageState;
    dispatch: Dispatch<Action>;
}

const DefaultSettingPageContext = createContext<DefaultSettingContextValue | undefined>(undefined);

export function DefaultSettingPageProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DefaultSettingPageContext.Provider value={{ state, dispatch }}>
            {children}
        </DefaultSettingPageContext.Provider>
    );
}

export function useDefaultSettingPage() {
    const ctx = useContext(DefaultSettingPageContext);
    if (!ctx) {
        throw new Error('useDefaultSetting must be used within DefaultSettingProvider');
    }
    return ctx;
}
