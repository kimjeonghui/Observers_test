package com.posco.invoiceservice.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAccountingSlipInvoiceNumEntity is a Querydsl query type for AccountingSlipInvoiceNumEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAccountingSlipInvoiceNumEntity extends EntityPathBase<AccountingSlipInvoiceNumEntity> {

    private static final long serialVersionUID = 284570353L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAccountingSlipInvoiceNumEntity accountingSlipInvoiceNumEntity = new QAccountingSlipInvoiceNumEntity("accountingSlipInvoiceNumEntity");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final ListPath<AccountingSlipEntity, QAccountingSlipEntity> accountingSlipEntityList = this.<AccountingSlipEntity, QAccountingSlipEntity>createList("accountingSlipEntityList", AccountingSlipEntity.class, QAccountingSlipEntity.class, PathInits.DIRECT2);

    //inherited
    public final StringPath createdBy = _super.createdBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final StringPath fiscalMonth = createString("fiscalMonth");

    public final QInvoiceDataEntity invoiceDataEntity;

    public final StringPath invoiceNum = createString("invoiceNum");

    //inherited
    public final StringPath lastModifiedBy = _super.lastModifiedBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUpdatedDate = _super.lastUpdatedDate;

    public final NumberPath<Integer> num = createNumber("num", Integer.class);

    public final StringPath ovsCd = createString("ovsCd");

    public QAccountingSlipInvoiceNumEntity(String variable) {
        this(AccountingSlipInvoiceNumEntity.class, forVariable(variable), INITS);
    }

    public QAccountingSlipInvoiceNumEntity(Path<? extends AccountingSlipInvoiceNumEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAccountingSlipInvoiceNumEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAccountingSlipInvoiceNumEntity(PathMetadata metadata, PathInits inits) {
        this(AccountingSlipInvoiceNumEntity.class, metadata, inits);
    }

    public QAccountingSlipInvoiceNumEntity(Class<? extends AccountingSlipInvoiceNumEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.invoiceDataEntity = inits.isInitialized("invoiceDataEntity") ? new QInvoiceDataEntity(forProperty("invoiceDataEntity"), inits.get("invoiceDataEntity")) : null;
    }

}

