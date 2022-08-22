import { ContainerProps } from "@nickgdev/hellerui/lib/components/Container/types";

export type WidgetProps = Pick<ContainerProps, 'height' | 'className' | 'id'> & { widgetTag: string };