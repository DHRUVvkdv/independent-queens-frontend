import { Tabs, TabsList, TabsContent } from "@radix-ui/react-tabs";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function ProfileSkeleton() {
	return (
		<div className="container mx-auto py-6 space-y-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Profile</h1>
				<Skeleton className="h-10 w-28" />
			</div>

			<Tabs defaultValue="overview" className="space-y-4">
				<TabsList>
					<Skeleton className="h-8 w-24 rounded-lg" />
				</TabsList>

				<TabsContent value="overview" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{/* Skeleton for Avatar Profile */}
						<Card className="col-span-1">
							<CardContent className="pt-6 space-y-4 flex flex-col items-center">
								<Skeleton className="w-24 h-24 rounded-full" />
								<Skeleton className="h-6 w-48" />
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-6 w-16" />
							</CardContent>
						</Card>

						{/* Skeleton for Contact Info */}
						<Card className="col-span-2">
							<CardHeader>
								<Skeleton className="h-6 w-36" />
							</CardHeader>
							<CardContent className="space-y-4">
								<Skeleton className="h-4 w-64" />
								<Skeleton className="h-4 w-48" />
								<Skeleton className="h-4 w-56" />
							</CardContent>
						</Card>

						{/* Skeleton for Skills */}
						<Card>
							<CardHeader>
								<Skeleton className="h-6 w-32" />
							</CardHeader>
							<CardContent className="space-y-4">
								<Skeleton className="h-4 w-48" />
								<Skeleton className="h-4 w-40" />
								<Skeleton className="h-4 w-56" />
							</CardContent>
						</Card>

						{/* Skeleton for Recent Activity */}
						<Card>
							<CardHeader>
								<Skeleton className="h-6 w-36" />
							</CardHeader>
							<CardContent className="space-y-4">
								<Skeleton className="h-4 w-64" />
								<Skeleton className="h-4 w-64" />
								<Skeleton className="h-4 w-64" />
							</CardContent>
						</Card>

						{/* Skeleton for Recent Activity */}
						<Card>
							<CardHeader>
								<Skeleton className="h-6 w-36" />
							</CardHeader>
							<CardContent className="space-y-4">
								<Skeleton className="h-4 w-64" />
								<Skeleton className="h-4 w-64" />
								{/* <Skeleton className="h-4 w-64" /> */}
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
