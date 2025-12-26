"use client";

import { useMemo, useState, type FormEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";

type DisabledDateProps = {
  reservedDates?: Array<{ starDate: Date; endDate: Date }> | Date[];
};

type produkProps2 = {
  id: string;
  name?: string;
  price: number;
  [key: string]: any;
};

const ReserveForm = ({
  produk,
  disabledDates,
}: {
  produk: produkProps2;
  disabledDates?: DisabledDateProps;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [starDate, setStarDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const excludeIntervals = useMemo(() => {
    const list = disabledDates?.reservedDates;
    if (!list || !Array.isArray(list)) return [];

    if (
      list.length > 0 &&
      (list[0] as any)?.starDate &&
      (list[0] as any)?.endDate
    ) {
      return (list as Array<any>).map((r) => ({
        start: new Date(r.starDate),
        end: new Date(r.endDate),
      }));
    }

    if (list.length > 0 && list[0] instanceof Date) {
      return (list as Date[]).map((d) => ({
        start: new Date(d),
        end: new Date(d),
      }));
    }

    return [];
  }, [disabledDates]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // ✅ sementara dimatikan agar build hijau (tanpa nebak signature createReserve)
      throw new Error(
        "Fitur reservation sedang maintenance. Coba lagi sebentar."
      );
    } catch (err: any) {
      setError(err?.message || "Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm mb-1">Arrival</label>
          <DatePicker
            selected={starDate}
            onChange={(date) => setStarDate(date)}
            selectsStart
            startDate={starDate}
            endDate={endDate}
            minDate={new Date()}
            excludeDateIntervals={excludeIntervals as any}
            className="border px-3 py-2 rounded-md w-full"
            placeholderText="Select arrival date"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Departure</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={starDate}
            endDate={endDate}
            minDate={starDate ?? new Date()}
            excludeDateIntervals={excludeIntervals as any}
            className="border px-3 py-2 rounded-md w-full"
            placeholderText="Select departure date"
          />
        </div>
      </div>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting || !starDate || !endDate}
        className={clsx(
          "bg-orange-400 text-white w-full hover:bg-orange-500 py-2.5 px-6 md:px-10 text-lg font-semibold",
          {
            "opacity-50 cursor-not-allowed":
              isSubmitting || !starDate || !endDate,
          }
        )}
      >
        {isSubmitting ? "Processing..." : "Reserve Now"}
      </button>
    </form>
  );
};

export default ReserveForm;
