import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  DefaultValuePipe,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { TripService } from "./trip.service";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Public } from "src/auth/decorators/public.decorator";
import { UserRole } from "generated/prisma/enums";
import { Roles } from "src/auth/decorators/roles.decorator";

@Controller("trip")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags("trip")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new trip",
    description: "Add a trip to the database.",
  })
  @ApiResponse({
    status: 201,
    description: "The trip has been successfully created.",
    type: CreateTripDto,
  })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @Public()
  @ApiOperation({
    summary: "Retrieve a list of trips",
    description: "Retrieves a list of trips from the database.",
  })
  @ApiQuery({
    name: "offset",
    type: Number,
    required: false,
    description: "Amount to skip (default is 0)",
  })
  @ApiQuery({
    name: "limit",
    type: Number,
    required: false,
    description: "Max amount of returned records (default is 10)",
  })
  @ApiResponse({
    status: 200,
    description: "A list of trips has been successfully retrieved.",
    type: [CreateTripDto],
  })
  async findAll(
    @Query("offset", new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.tripService.findAll(offset, limit);
  }

  @Get(":id")
  @Public()
  @ApiOperation({
    summary: "Retrieve a trip by ID",
    description: "Retrieves a trip by their unique ID from the database.",
  })
  @ApiResponse({
    status: 200,
    description: "The trip has been successfully retrieved.",
    type: CreateTripDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.tripService.findOne(id);
  }

  @Patch(":id")
  @Roles(UserRole.MOD, UserRole.ADMIN)
  @ApiOperation({
    summary: "Update a trip by ID",
    description: "Updates a trip by their unique ID from the database.",
  })
  @ApiResponse({
    status: 200,
    description: "The trip has been successfully updated.",
    type: UpdateTripDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(":id")
  @Roles(UserRole.MOD, UserRole.ADMIN)
  @ApiOperation({
    summary: "Delete a trip by ID",
    description: "Deletes a trip by their unique ID from the database.",
  })
  @ApiResponse({
    status: 204,
    description: "The trip has been successfully deleted.",
  })
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }
}
