// DeclarationTypeSyncOnCode7.tsx
import React, { useEffect, useRef, useCallback } from 'react';
import { useFormikContext } from 'formik';

/** ====== Types ====== */
type GeneralInfo2 = {
  value_declaration_type_code: string | number | null;
  transport_fee: number | string;
  adjustment_item_value_1: number | string;
};

export type ExportForm = {
  general_info_2: GeneralInfo2;
};

const TRANSPORT = 'general_info_2.transport_fee';
const ADJ1 = 'general_info_2.adjustment_item_value_1';

const toNumber = (v: unknown): number => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};
const isCode7 = (code: unknown) => String(code ?? '') === '7';

function useLatest<T>(value: T) {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}

const DeclarationTypeSyncOnCode7: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<ExportForm>();

  const prevCodeRef = useRef<string>('');      // track transition -> '7' hoặc rời '7'
  const didInitRunRef = useRef(false);         // run-once at mount
  const valuesRef = useLatest(values);         // latest form values

  // Tổng số đã cộng vào transport_fee khi đang ở code '7'
  const movedWhile7Ref = useRef<number>(0);

  const sumAdj1IntoTransportAndClear = useCallback(() => {
    const v = valuesRef.current.general_info_2;
    const transport = toNumber(v.transport_fee);
    const adj1 = toNumber(v.adjustment_item_value_1);
    if (adj1 === 0) return;

    // Cộng vào transport và xóa ADJ1
    setFieldValue(TRANSPORT, transport + adj1, false);
    setFieldValue(ADJ1, '', false);

    // Ghi nhận tổng đã cộng để có thể hoàn khi rời code '7'
    movedWhile7Ref.current += adj1;
  }, [setFieldValue, valuesRef]);

  // Hoàn lại khi rời code '7'
  const revertWhenLeaving7 = useCallback(() => {
    const moved = movedWhile7Ref.current;
    if (moved === 0) return;

    const v = valuesRef.current.general_info_2;
    const transport = toNumber(v.transport_fee);

    // Trừ lại phần đã cộng và trả về ADJ1
    setFieldValue(TRANSPORT, transport - moved, false);
    setFieldValue(ADJ1, moved, false);

    movedWhile7Ref.current = 0; // reset
  }, [setFieldValue, valuesRef]);

  /** (1) Lúc mount: nếu code === '7' thì cộng. (2) Khi chuyển sang '7' thì cộng. (3) Khi rời '7' thì hoàn. */
  useEffect(() => {
    const currCode = String(values.general_info_2.value_declaration_type_code ?? '');
    const prevCode = prevCodeRef.current;

    if (!didInitRunRef.current) {
      didInitRunRef.current = true;
      if (isCode7(currCode)) {
        sumAdj1IntoTransportAndClear();
      }
    } else {
      // prev != '7' && curr == '7' -> cộng
      if (!isCode7(prevCode) && isCode7(currCode)) {
        sumAdj1IntoTransportAndClear();
      }
      // prev == '7' && curr != '7' -> hoàn lại
      else if (isCode7(prevCode) && !isCode7(currCode)) {
        revertWhenLeaving7();
      }
    }

    prevCodeRef.current = currCode;
  }, [values.general_info_2.value_declaration_type_code, sumAdj1IntoTransportAndClear, revertWhenLeaving7]);

  /** (4) Nhấn Enter trong field ADJ1 khi code === '7' → cộng */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return;

      const el = document.activeElement as HTMLInputElement | null;
      const isAdj1Field =
        !!el &&
        (el.getAttribute('name') === ADJ1 ||
          el.getAttribute('data-key') === ADJ1);

      if (!isAdj1Field) return;

      const curr = valuesRef.current.general_info_2;
      if (!isCode7(curr.value_declaration_type_code)) return;

      sumAdj1IntoTransportAndClear();
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [sumAdj1IntoTransportAndClear, valuesRef]);

  return null;
};

export default DeclarationTypeSyncOnCode7;
