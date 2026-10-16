import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  numeric,
  boolean,
  timestamp,
  date,
} from "drizzle-orm/pg-core";


/* =========================================================
   PROPERTIES
========================================================= */

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),

  title: varchar("title", {
    length: 255,
  }).notNull(),

  description: text("description"),

  price: numeric("price", {
    precision: 14,
    scale: 2,
  }).notNull(),

  city: varchar("city", {
    length: 100,
  }).notNull(),

  locality: varchar("locality", {
    length: 150,
  }),

  address: text("address"),

  propertyType: varchar("property_type", {
    length: 50,
  }).notNull(),

  listingType: varchar("listing_type", {
    length: 30,
  }).notNull(),

  bhk: integer("bhk"),

  bathrooms: integer("bathrooms"),

  balconies: integer("balconies"),

  area: numeric("area", {
    precision: 10,
    scale: 2,
  }),

  areaUnit: varchar("area_unit", {
    length: 30,
  }).default("sq.ft"),

  status: varchar("status", {
    length: 30,
  })
    .default("available")
    .notNull(),

  featured: boolean("featured")
    .default(false)
    .notNull(),

  verified: boolean("verified")
    .default(false)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});


/* =========================================================
   PROPERTY IMAGES
========================================================= */

export const propertyImages = pgTable(
  "property_images",
  {
    id: serial("id").primaryKey(),

    propertyId: integer("property_id")
      .notNull()
      .references(() => properties.id, {
        onDelete: "cascade",
      }),

    imageKey: text("image_key")
      .notNull(),

    isPrimary: boolean("is_primary")
      .default(false)
      .notNull(),

    displayOrder: integer("display_order")
      .default(0)
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  }
);


/* =========================================================
   PROJECTS / NEW LAUNCHES
========================================================= */

export const projects = pgTable(
  "projects",
  {
    id: serial("id").primaryKey(),

    name: varchar("name", {
      length: 255,
    }).notNull(),

    developerName: varchar(
      "developer_name",
      {
        length: 255,
      }
    ),

    description: text("description"),

    city: varchar("city", {
      length: 100,
    }).notNull(),

    locality: varchar("locality", {
      length: 150,
    }),

    address: text("address"),

    projectType: varchar(
      "project_type",
      {
        length: 60,
      }
    ).notNull(),

    startingPrice: numeric(
      "starting_price",
      {
        precision: 14,
        scale: 2,
      }
    ),

    launchStatus: varchar(
      "launch_status",
      {
        length: 50,
      }
    )
      .default("new_launch")
      .notNull(),

    possessionDate: date(
      "possession_date"
    ),

    featured: boolean("featured")
      .default(false)
      .notNull(),

    verified: boolean("verified")
      .default(false)
      .notNull(),

    status: varchar("status", {
      length: 30,
    })
      .default("active")
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  }
);


/* =========================================================
   PROJECT IMAGES
========================================================= */

export const projectImages = pgTable(
  "project_images",
  {
    id: serial("id").primaryKey(),

    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, {
        onDelete: "cascade",
      }),

    imageKey: text("image_key")
      .notNull(),

    isPrimary: boolean("is_primary")
      .default(false)
      .notNull(),

    displayOrder: integer(
      "display_order"
    )
      .default(0)
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  }
);

/* =========================================================
   PROPERTY CATEGORIES / WHAT WE OFFER
========================================================= */

export const propertyCategories = pgTable(
  "property_categories",
  {
    id: serial("id").primaryKey(),

    name: varchar("name", {
      length: 255,
    }).notNull(),

    description: text("description"),

    specialities:
      text("specialities").array(),

    buttonLabel: varchar(
      "button_label",
      {
        length: 100,
      }
    )
      .default("Browse Listings")
      .notNull(),

    linkPath: varchar(
      "link_path",
      {
        length: 255,
      }
    ),

    imageKey: text("image_key"),

    displayOrder:
      integer("display_order")
        .default(0)
        .notNull(),

    active:
      boolean("active")
        .default(true)
        .notNull(),

    createdAt:
      timestamp("created_at")
        .defaultNow()
        .notNull(),

    updatedAt:
      timestamp("updated_at")
        .defaultNow()
        .notNull(),
  }
);

/* =========================================================
   ADMINS
========================================================= */

export const admins = pgTable(
  "admins",
  {
    id: serial("id")
      .primaryKey(),

    name: varchar("name", {
      length: 150,
    })
      .notNull(),

    email: varchar("email", {
      length: 255,
    })
      .notNull()
      .unique(),

    passwordHash: text("password_hash")
      .notNull(),

    role: varchar("role", {
      length: 30,
    })
      .default("admin")
      .notNull(),

    active: boolean("active")
      .default(true)
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  }
);

/* =========================================================
   ENQUIRIES / LEADS
========================================================= */

export const enquiries = pgTable(
  "enquiries",
  {
    id: serial("id").primaryKey(),

    name: varchar("name", {
      length: 150,
    }).notNull(),

    email: varchar("email", {
      length: 255,
    }),

    phone: varchar("phone", {
      length: 30,
    }).notNull(),

    message: text("message"),

    propertyId: integer("property_id")
      .references(
        () => properties.id,
        {
          onDelete: "set null",
        }
      ),

    projectId: integer("project_id")
      .references(
        () => projects.id,
        {
          onDelete: "set null",
        }
      ),

    status: varchar("status", {
      length: 30,
    })
      .default("new")
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  }
);