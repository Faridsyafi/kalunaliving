import { Prisma } from "@prisma/client";

export type produkProps = Prisma.ProdukGetPayload<{
  include: { produkAmenities: { select: { amenitiesId: true } } };
}>;

export type produkProps2 = Prisma.ProdukGetPayload<{
  include: {
    produkAmenities: {
      include: {
        Amenities: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;

export type DisabledDateProps = Prisma.ReservationGetPayload<{
  select: {
    starDate: true;
    endDate: true;
  };
}>;
