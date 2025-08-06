CREATE TABLE "business_inputs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"keywords" text,
	"location" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "call_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"lead_id" integer,
	"outcome" varchar(50),
	"notes" text,
	"timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_input_id" integer,
	"name" varchar(100),
	"email" varchar(100),
	"phone" varchar(30),
	"address" text,
	"website" varchar(200),
	"score" double precision,
	"source" varchar(50)
);
--> statement-breakpoint
ALTER TABLE "call_logs" ADD CONSTRAINT "call_logs_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_business_input_id_business_inputs_id_fk" FOREIGN KEY ("business_input_id") REFERENCES "public"."business_inputs"("id") ON DELETE no action ON UPDATE no action;