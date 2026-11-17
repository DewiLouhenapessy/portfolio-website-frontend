"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import {
	Button as AccordionTriggerPrimitive,
	Disclosure as AccordionItemPrimitive,
	DisclosureGroup as AccordionPrimitive,
	DisclosurePanel as AccordionContentPrimitive,
	Heading as AccordionHeaderPrimitive,
	type ButtonProps,
	type DisclosureGroupProps,
	type DisclosurePanelProps,
	type DisclosureProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

type AccordionProps = Omit<DisclosureGroupProps, "className"> & {
	className?: string;
};

function Accordion({ className, ...props }: AccordionProps) {
	return (
		<AccordionPrimitive
			data-slot="accordion"
			className={cn("flex w-full flex-col", className)}
			{...props}
		/>
	);
}

type AccordionItemProps = Omit<DisclosureProps, "className"> & {
	className?: string;
};

function AccordionItem({ className, ...props }: AccordionItemProps) {
	return (
		<AccordionItemPrimitive
			data-slot="accordion-item"
			className={cn(className)}
			{...props}
		/>
	);
}

type AccordionTriggerProps = Omit<ButtonProps, "children" | "className"> & {
	children: React.ReactNode;
	className?: string;
	headingLevel?: number;
};

function AccordionTrigger({
	className,
	children,
	headingLevel = 2,
	...props
}: AccordionTriggerProps) {
	return (
		<AccordionHeaderPrimitive className="flex" level={headingLevel}>
			<AccordionTriggerPrimitive
				slot="trigger"
				data-slot="accordion-trigger"
				className={cn(
					"group/accordion-trigger flex w-full items-start justify-between gap-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
					className,
				)}
				{...props}
			>
				{children}
				<ChevronDown
					aria-hidden="true"
					className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-aria-expanded/accordion-trigger:rotate-180"
				/>
			</AccordionTriggerPrimitive>
		</AccordionHeaderPrimitive>
	);
}

type AccordionContentProps = Omit<DisclosurePanelProps, "className"> & {
	className?: string;
};

function AccordionContent({
	className,
	children,
	...props
}: AccordionContentProps) {
	return (
		<AccordionContentPrimitive
			data-slot="accordion-content"
			className="h-(--disclosure-panel-height) overflow-clip transition-[height]"
			{...props}
		>
			<div className={cn(className)}>{children}</div>
		</AccordionContentPrimitive>
	);
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
